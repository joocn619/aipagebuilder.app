"use client";

import { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface HeatmapClick {
  x_pct: number;
  y_pct: number;
  device: string;
  created_at: string;
}

interface HeatmapOverlayProps {
  pageId: string;
}

function getHeatColor(intensity: number): string {
  // 0 = cold (blue), 1 = hot (red)
  const r = Math.round(intensity * 255);
  const b = Math.round((1 - intensity) * 200);
  return `rgba(${r}, 50, ${b}, 0.7)`;
}

function buildHeatmap(clicks: HeatmapClick[], width: number, height: number) {
  if (!clicks.length || !width || !height) return [];

  // Group nearby clicks into clusters (cell size = 2% of width/height)
  const cellW = 100 / 30;
  const cellH = 100 / 20;
  const cells: Record<string, { x: number; y: number; count: number }> = {};

  for (const click of clicks) {
    const cx = Math.floor(click.x_pct / cellW);
    const cy = Math.floor(click.y_pct / cellH);
    const key = `${cx}-${cy}`;
    if (!cells[key]) {
      cells[key] = { x: cx * cellW + cellW / 2, y: cy * cellH + cellH / 2, count: 0 };
    }
    cells[key].count++;
  }

  const values = Object.values(cells);
  const maxCount = Math.max(...values.map((v) => v.count), 1);

  return values.map((cell) => ({
    ...cell,
    intensity: cell.count / maxCount,
  }));
}

export function HeatmapOverlay({ pageId }: HeatmapOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clicks, setClicks] = useState<HeatmapClick[]>([]);
  const [device, setDevice] = useState("desktop");
  const [loading, setLoading] = useState(true);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(`/api/analytics/heatmap?page_id=${pageId}&device=${device}`);
      if (res.ok) {
        const data = await res.json();
        setClicks(data.clicks || []);
      }
      setLoading(false);
    };
    load();
  }, [pageId, device]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setDims({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const hotspots = buildHeatmap(clicks, dims.width, dims.height);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Click Heatmap</h3>
          <Badge variant="secondary">{clicks.length.toLocaleString()} clicks</Badge>
        </div>
        <Select value={device} onValueChange={setDevice}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="all">All Devices</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        ref={containerRef}
        className="relative w-full rounded-lg border bg-muted/30"
        style={{ minHeight: 400 }}
      >
        {loading ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
            Loading heatmap data...
          </div>
        ) : clicks.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
            No click data yet for this device
          </div>
        ) : (
          <>
            {hotspots.map((spot, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${Math.max(20, spot.intensity * 60)}px`,
                  height: `${Math.max(20, spot.intensity * 60)}px`,
                  background: getHeatColor(spot.intensity),
                  transform: "translate(-50%, -50%)",
                  filter: "blur(8px)",
                  opacity: 0.5 + spot.intensity * 0.5,
                }}
              />
            ))}
            {/* Legend */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-background/80 px-3 py-1.5 text-xs border">
              <div className="h-3 w-16 rounded" style={{ background: "linear-gradient(to right, rgba(0,50,200,0.7), rgba(255,50,0,0.7))" }} />
              <span className="text-muted-foreground">Low → High</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
