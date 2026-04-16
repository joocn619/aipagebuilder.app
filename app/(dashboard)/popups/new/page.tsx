"use client";

import { useRouter } from "next/navigation";
import { PopupEditor } from "@/components/popups/PopupEditor";

export default function NewPopupPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create New Popup</h1>
        <p className="text-muted-foreground">Design a popup to boost your conversions</p>
      </div>
      <PopupEditor
        onSave={() => {
          // TODO: Save to Supabase
          router.push("/popups");
        }}
      />
    </div>
  );
}
