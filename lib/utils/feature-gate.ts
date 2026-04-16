import { PLANS, type PlanKey } from "@/lib/constants/plans";

export function canUseFeature(plan: PlanKey, feature: keyof typeof PLANS.free.limits): boolean {
  const limits = PLANS[plan]?.limits;
  if (!limits) return false;
  const val = limits[feature];
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val !== 0;
  if (typeof val === "string") return val !== "basic";
  return false;
}

export function getLimit(plan: PlanKey, feature: keyof typeof PLANS.free.limits): number | boolean | string {
  return PLANS[plan]?.limits[feature] ?? 0;
}

export function isWithinLimit(plan: PlanKey, feature: "pages" | "aiCredits" | "popups" | "teamMembers", currentUsage: number): boolean {
  const limit = PLANS[plan]?.limits[feature];
  if (typeof limit !== "number") return false;
  if (limit === -1) return true; // unlimited
  return currentUsage < limit;
}

export function getPlanForFeature(feature: keyof typeof PLANS.free.limits): PlanKey {
  const order: PlanKey[] = ["free", "starter", "pro", "unlimited"];
  for (const plan of order) {
    if (canUseFeature(plan, feature)) return plan;
  }
  return "unlimited";
}
