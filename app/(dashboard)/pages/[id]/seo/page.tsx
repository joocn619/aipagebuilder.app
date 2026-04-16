"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEOEditor } from "@/components/seo/SEOEditor";
import { toast } from "sonner";

export default function PageSEOPage() {
  const params = useParams();
  const pageId = params.id as string;

  const handleSave = async (data: Parameters<typeof SEOEditor>[0]["onSave"] extends (d: infer D) => void ? D : never) => {
    const res = await fetch(`/api/pages/${pageId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meta_title: data.metaTitle,
        meta_description: data.metaDescription,
        og_title: data.ogTitle,
        og_description: data.ogDescription,
        og_image: data.ogImage,
        canonical_url: data.canonicalUrl,
        no_index: data.noIndex,
        no_follow: data.noFollow,
        structured_data: data.structuredData,
        focus_keyword: data.focusKeyword,
      }),
    });

    if (!res.ok) {
      toast.error("Failed to save SEO settings");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href={`/pages`}>
          <Button variant="ghost" size="sm">← Pages</Button>
        </Link>
        <h1 className="text-2xl font-bold">SEO Settings</h1>
      </div>

      <SEOEditor
        pageId={pageId}
        pageTitle="My Page"
        pageSlug={pageId}
        onSave={handleSave}
      />
    </div>
  );
}
