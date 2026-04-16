"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";
import { Button } from "@/components/ui/button";

interface Plan {
  name: string;
  price: number;
  period?: string;
  features?: string[];
  ctaText?: string;
  highlighted?: boolean;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function PricingBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; subheading?: string; plans?: Plan[] };

  return (
    <div className="py-12">
      <div className="mb-10 text-center">
        {isEditing ? (
          <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>
            {c.heading}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold">{c.heading}</h2>
        )}
        {c.subheading && <p className="mt-2 text-muted-foreground">{c.subheading}</p>}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(c.plans || []).map((plan, i) => (
          <div key={i} className={`rounded-xl border p-6 ${plan.highlighted ? "border-2 shadow-lg" : ""}`}
            style={plan.highlighted ? { borderColor: globalStyles.primaryColor } : {}}>
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="my-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.period || "month"}</span>
            </div>
            <ul className="mb-6 space-y-2">
              {(plan.features || []).map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">&#10003;</span> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}
              style={plan.highlighted ? { backgroundColor: globalStyles.primaryColor } : {}}
              onClick={(e) => isEditing && e.preventDefault()}>
              {plan.ctaText || "Get Started"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
