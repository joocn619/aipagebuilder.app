import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIPageBuilder — Build Landing Pages with AI",
  description:
    "Build high-converting landing pages with AI in seconds. No code needed. Replaces $500+/mo in tools for $39/mo.",
  metadataBase: new URL("https://aipagebuilder.app"),
  openGraph: {
    title: "AIPageBuilder — Build Landing Pages with AI",
    description: "Build high-converting landing pages with AI in seconds. No code needed.",
    url: "https://aipagebuilder.app",
    siteName: "AIPageBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIPageBuilder — Build Landing Pages with AI",
    description: "Build high-converting landing pages with AI in seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
