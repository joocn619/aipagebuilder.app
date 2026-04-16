"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface SessionEvent {
  type: "mousemove" | "click" | "scroll" | "keydown" | "resize";
  x?: number;
  y?: number;
  scroll_y?: number;
  timestamp: number;
}

interface SessionData {
  id: string;
  session_id: string;
  recording_data: SessionEvent[];
  duration_ms: number;
  device: string;
  screen_width?: number;
  screen_height?: number;
  created_at: string;
}

interface SessionPlayerProps {
  sessionId: string;
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function SessionPlayer({ sessionId }: SessionPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const eventIdxRef = useRef(0);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/sessions/${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setSession(data.session);
      }
      setLoading(false);
    };
    load();
  }, [sessionId]);

  const drawFrame = useCallback((time: number, events: SessionEvent[], canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find cursor position and clicks at current time
    let cursorX = canvas.width / 2;
    let cursorY = canvas.height / 2;
    let scrollY = 0;
    const clicks: { x: number; y: number }[] = [];

    for (const event of events) {
      if (event.timestamp > time) break;
      if (event.type === "mousemove" && event.x !== undefined && event.y !== undefined) {
        // Scale from original screen to canvas
        cursorX = event.x * (canvas.width / 100);
        cursorY = event.y * (canvas.height / 100);
      }
      if (event.type === "scroll" && event.scroll_y !== undefined) {
        scrollY = event.scroll_y;
      }
      if (event.type === "click" && event.x !== undefined && event.y !== undefined) {
        const age = time - event.timestamp;
        if (age < 1500) {
          clicks.push({ x: event.x * (canvas.width / 100), y: event.y * (canvas.height / 100) });
        }
      }
    }

    // Draw scroll indicator
    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.fillText(`Scroll: ${Math.round(scrollY)}px`, 8, 16);

    // Draw click ripples
    for (const click of clicks) {
      ctx.beginPath();
      ctx.arc(click.x, click.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw cursor
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  useEffect(() => {
    if (!session || !canvasRef.current) return;
    drawFrame(currentTime, session.recording_data, canvasRef.current);
  }, [currentTime, session, drawFrame]);

  useEffect(() => {
    if (!playing || !session) return;

    const tick = (now: number) => {
      if (lastFrameRef.current === 0) lastFrameRef.current = now;
      const delta = (now - lastFrameRef.current) * speed;
      lastFrameRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + delta;
        if (next >= session.duration_ms) {
          setPlaying(false);
          return session.duration_ms;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastFrameRef.current = 0;
    };
  }, [playing, speed, session]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
        Session not found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Session Recording</h3>
          <Badge variant="secondary">{session.device}</Badge>
          <Badge variant="outline">{formatTime(session.duration_ms)}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Speed:</span>
          {[0.5, 1, 2, 4].map((s) => (
            <Button
              key={s}
              variant={speed === s ? "default" : "outline"}
              size="sm"
              className="h-7 w-12 text-xs"
              onClick={() => setSpeed(s)}
            >
              {s}x
            </Button>
          ))}
        </div>
      </div>

      {/* Privacy notice */}
      <div className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
        Input fields and sensitive elements are automatically masked for privacy.
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-lg border bg-slate-50">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="w-full"
        />
      </div>

      {/* Controls */}
      <div className="space-y-2">
        <Slider
          min={0}
          max={session.duration_ms}
          step={100}
          value={[currentTime]}
          onValueChange={([v]) => { setCurrentTime(v); eventIdxRef.current = 0; }}
        />
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setCurrentTime(0); eventIdxRef.current = 0; setPlaying(false); }}
          >
            &#9632; Reset
          </Button>
          <Button
            size="sm"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </Button>
          <span className="ml-auto text-xs text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(session.duration_ms)}
          </span>
        </div>
      </div>
    </div>
  );
}
