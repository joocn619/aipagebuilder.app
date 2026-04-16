import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080810]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080810]/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <span className="text-lg font-bold text-white">AIPageBuilder</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <Link href="/#features" className="text-white/50 transition-colors hover:text-white">Features</Link>
            <Link href="/#how-it-works" className="text-white/50 transition-colors hover:text-white">How It Works</Link>
            <Link href="/pricing" className="text-white/50 transition-colors hover:text-white">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600 border-0 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080810]">
        <div className="container py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <span className="font-bold text-white">AIPageBuilder</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">
                The AI-powered page builder for agencies and marketers.
              </p>
            </div>
            <div>
              <p className="font-medium text-sm mb-4 text-white/70">Product</p>
              <div className="space-y-2.5 text-sm text-white/30">
                <Link href="/#features" className="block hover:text-white transition-colors">Features</Link>
                <Link href="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
                <Link href="/gallery" className="block hover:text-white transition-colors">Templates</Link>
              </div>
            </div>
            <div>
              <p className="font-medium text-sm mb-4 text-white/70">Company</p>
              <div className="space-y-2.5 text-sm text-white/30">
                <Link href="#" className="block hover:text-white transition-colors">About</Link>
                <Link href="#" className="block hover:text-white transition-colors">Blog</Link>
                <Link href="#" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <p className="font-medium text-sm mb-4 text-white/70">Legal</p>
              <div className="space-y-2.5 text-sm text-white/30">
                <Link href="#" className="block hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="block hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-white/20">
            © {new Date().getFullYear()} AIPageBuilder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
