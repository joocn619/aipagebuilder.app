"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

interface RealtimeVisitorsProps {
  pageId?: string;
}

export function RealtimeVisitors({ pageId }: RealtimeVisitorsProps) {
  const [count, setCount] = useState(0);
  const [recentEvents, setRecentEvents] = useState<{ type: string; time: string }[]>([]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("realtime-analytics")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "page_events",
          filter: pageId ? `page_id=eq.${pageId}` : undefined,
        },
        (payload) => {
          const event = payload.new as { event_type: string; created_at: string };
          if (event.event_type === "view") {
            setCount((prev) => prev + 1);
          }
          setRecentEvents((prev) => [
            { type: event.event_type, time: new Date().toLocaleTimeString() },
            ...prev.slice(0, 4),
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageId]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <div className="absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full bg-green-500 opacity-60" />
        </div>
        <span className="font-semibold text-sm">Live Visitors</span>
        <Badge className="bg-green-500/15 text-green-700 hover:bg-green-500/15">
          {count} active
        </Badge>
      </div>

      {recentEvents.length > 0 && (
        <div className="space-y-1">
          {recentEvents.map((event, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
              <span className="capitalize">{event.type.replace("_", " ")}</span>
              <span className="ml-auto">{event.time}</span>
            </div>
          ))}
        </div>
      )}

      {recentEvents.length === 0 && (
        <p className="text-xs text-muted-foreground">Waiting for activity...</p>
      )}
    </div>
  );
}
