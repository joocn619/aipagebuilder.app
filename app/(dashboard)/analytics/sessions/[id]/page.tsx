"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SessionPlayer } from "@/components/analytics/SessionPlayer";

export default function SessionPlaybackPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/analytics/sessions">
          <Button variant="ghost" size="sm">← Back to Sessions</Button>
        </Link>
        <h1 className="text-2xl font-bold">Session Playback</h1>
      </div>
      <SessionPlayer sessionId={params.id as string} />
    </div>
  );
}
