"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Session {
  id: string;
  session_id: string;
  duration_ms: number;
  device: string;
  screen_width?: number;
  screen_height?: number;
  referrer?: string;
  created_at: string;
}

function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const DEMO_SESSIONS: Session[] = [
  { id: "s1", session_id: "abc123", duration_ms: 142000, device: "desktop", screen_width: 1920, screen_height: 1080, referrer: "google.com", created_at: new Date(Date.now() - 300000).toISOString() },
  { id: "s2", session_id: "def456", duration_ms: 67000, device: "mobile", screen_width: 390, screen_height: 844, referrer: "", created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: "s3", session_id: "ghi789", duration_ms: 230000, device: "tablet", screen_width: 768, screen_height: 1024, referrer: "twitter.com", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "s4", session_id: "jkl012", duration_ms: 18000, device: "desktop", screen_width: 1440, screen_height: 900, referrer: "linkedin.com", created_at: new Date(Date.now() - 172800000).toISOString() },
];

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(DEMO_SESSIONS);
  const [deviceFilter, setDeviceFilter] = useState("all");

  const filtered = deviceFilter === "all"
    ? sessions
    : sessions.filter((s) => s.device === deviceFilter);

  const deleteSession = async (id: string) => {
    await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session deleted");
  };

  const deviceIcon = (device: string) => {
    if (device === "mobile") return "📱";
    if (device === "tablet") return "🖥";
    return "💻";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Session Recordings</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} sessions</p>
        </div>
        <Select value={deviceFilter} onValueChange={setDeviceFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All devices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Devices</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">No sessions recorded yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Sessions are captured automatically on published pages</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((session) => (
            <Card key={session.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{deviceIcon(session.device)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm font-mono">{session.session_id.substring(0, 12)}...</span>
                      <Badge variant="secondary" className="text-[10px]">{session.device}</Badge>
                      {session.screen_width && (
                        <span className="text-xs text-muted-foreground">{session.screen_width}×{session.screen_height}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Duration: <strong className="text-foreground">{formatDuration(session.duration_ms)}</strong></span>
                      {session.referrer && <span>From: <strong className="text-foreground">{session.referrer}</strong></span>}
                      <span>{timeAgo(session.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/analytics/sessions/${session.id}`}>
                    <Button variant="outline" size="sm">▶ Watch</Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteSession(session.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
