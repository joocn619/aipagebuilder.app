"use client";

interface Props {
  settings: { text?: string; ctaText?: string; ctaUrl?: string; bgColor?: string; textColor?: string; position?: string };
}

export function StickyBar({ settings }: Props) {
  return (
    <div
      className={`fixed left-0 right-0 z-50 flex items-center justify-center gap-4 px-4 py-3 ${settings.position === "top" ? "top-0" : "bottom-0"}`}
      style={{ backgroundColor: settings.bgColor || "#2563eb", color: settings.textColor || "#fff" }}
    >
      <span className="text-sm font-medium">{settings.text || "Get Started Today"}</span>
      <a
        href={settings.ctaUrl || "#"}
        className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition-colors"
      >
        {settings.ctaText || "Sign Up"}
      </a>
    </div>
  );
}
