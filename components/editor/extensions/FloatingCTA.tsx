"use client";

interface Props {
  settings: { type?: string; phoneNumber?: string; message?: string; bgColor?: string; position?: string };
}

export function FloatingCTA({ settings }: Props) {
  const pos = settings.position === "bottom-left" ? "bottom-4 left-4" : "bottom-4 right-4";
  const bgColor = settings.bgColor || "#25D366";

  const href = settings.type === "call"
    ? `tel:${settings.phoneNumber}`
    : settings.type === "email"
    ? `mailto:${settings.phoneNumber}`
    : `https://wa.me/${(settings.phoneNumber || "").replace(/\D/g, "")}?text=${encodeURIComponent(settings.message || "")}`;

  const label = settings.type === "call" ? "Call" : settings.type === "email" ? "Email" : "Chat";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-40 ${pos} flex h-14 w-14 items-center justify-center rounded-full shadow-lg text-white text-lg font-bold hover:scale-110 transition-transform`}
      style={{ backgroundColor: bgColor }}
      aria-label={label}
    >
      {settings.type === "call" ? "C" : settings.type === "email" ? "@" : "W"}
    </a>
  );
}
