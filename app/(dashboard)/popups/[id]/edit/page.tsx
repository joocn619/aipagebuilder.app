"use client";

import { useRouter, useParams } from "next/navigation";
import { PopupEditor } from "@/components/popups/PopupEditor";

export default function EditPopupPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Popup</h1>
        <p className="text-muted-foreground">Popup ID: {params.id}</p>
      </div>
      <PopupEditor
        initialData={{ name: "Newsletter Signup" }}
        onSave={() => {
          // TODO: Update in Supabase
          router.push("/popups");
        }}
      />
    </div>
  );
}
