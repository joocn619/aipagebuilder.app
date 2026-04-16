import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — AIPageBuilder",
  description: "Simple, transparent pricing. Start free. Upgrade when you're ready. 14-day trial on all paid plans.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Try it out — no credit card",
    features: [
      "3 published pages",
      "Basic editor (20 block types)",
      "10 AI credits/month",
      "50+ templates",
      "Community support",
    ],
    notIncluded: ["Heatmaps", "Session recording", "Analytics", "Popups", "SEO tools"],
    cta: "Get Started Free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    description: "For solopreneurs and freelancers",
    features: [
      "15 published pages",
      "All block types + presets",
      "100 AI credits/month",
      "Analytics dashboard",
      "Lead management",
      "Email support",
    ],
    notIncluded: ["Heatmaps", "Session recording", "Popups", "SEO tools"],
    cta: "Start 14-Day Trial",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/mo",
    description: "Most popular — for growing teams",
    features: [
      "Unlimited pages",
      "Click heatmaps + device filter",
      "Session recordings + playback",
      "500 AI credits/month",
      "Popup builder (6 types)",
      "12 conversion extensions",
      "Full SEO tools + audit",
      "Priority support",
    ],
    notIncluded: [],
    cta: "Start 14-Day Trial",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "/mo",
    description: "For agencies managing multiple clients",
    features: [
      "Everything in Pro",
      "Unlimited AI credits",
      "5 workspaces",
      "White-label (logo + colors)",
      "Custom domain per workspace",
      "Client collaboration tools",
      "Dedicated support",
      "SLA guarantee",
    ],
    notIncluded: [],
    cta: "Start 14-Day Trial",
    href: "/signup",
    highlight: false,
  },
];

const COMPARE = [
  { feature: "Published pages", free: "3", starter: "15", pro: "Unlimited", agency: "Unlimited" },
  { feature: "AI credits/month", free: "10", starter: "100", pro: "500", agency: "Unlimited" },
  { feature: "Block types", free: "20", starter: "20", pro: "20", agency: "20" },
  { feature: "Templates", free: "50+", starter: "50+", pro: "50+", agency: "50+" },
  { feature: "Analytics dashboard", free: "—", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "Click heatmaps", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "Session recordings", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "Popup builder", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "SEO tools", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "Conversion extensions", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "White-label", free: "—", starter: "—", pro: "—", agency: "✓" },
  { feature: "Custom domain", free: "—", starter: "—", pro: "—", agency: "✓" },
  { feature: "Workspaces", free: "1", starter: "1", pro: "1", agency: "5" },
];

export default function PricingPage() {
  return (
    <main>
      {/* Header */}
      <section className="border-b py-20 text-center">
        <div className="container max-w-3xl">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Simple pricing.<br />No surprises.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re ready. Cancel anytime. All paid plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-xl border p-6 ${
                  plan.highlight ? "border-primary bg-primary/5 shadow-xl" : "bg-background"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-3 py-0.5">Most Popular</Badge>
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">{plan.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm mb-1.5">{plan.period}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.notIncluded.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {plan.notIncluded.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/50">
                          <span className="mt-0.5">✗</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link href={plan.href} className="mt-4">
                  <Button
                    className="w-full"
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-t py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">Compare plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 pr-4 font-medium text-muted-foreground w-1/3">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold">Free</th>
                  <th className="text-center py-3 px-4 font-semibold">Starter</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary">Pro</th>
                  <th className="text-center py-3 px-4 font-semibold">Agency</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                    <td className="py-3 pr-4 text-muted-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-center">{row.free}</td>
                    <td className="py-3 px-4 text-center">{row.starter}</td>
                    <td className="py-3 px-4 text-center font-medium text-primary">{row.pro}</td>
                    <td className="py-3 px-4 text-center">{row.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-20 text-center">
        <div className="container max-w-xl">
          <h2 className="text-2xl font-bold mb-3">Still not sure?</h2>
          <p className="text-muted-foreground mb-6">Start with the Free plan. No credit card required. Upgrade anytime.</p>
          <Link href="/signup">
            <Button size="lg" className="h-12 px-8">Get Started Free</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
