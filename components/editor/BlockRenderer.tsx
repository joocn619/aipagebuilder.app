"use client";

import { type EditorBlock, type GlobalStyles } from "@/lib/stores/editor-store";
import { HeroBlock } from "./blocks/HeroBlock";
import { FeaturesBlock } from "./blocks/FeaturesBlock";
import { TestimonialsBlock } from "./blocks/TestimonialsBlock";
import { CTABlock } from "./blocks/CTABlock";
import { PricingBlock } from "./blocks/PricingBlock";
import { FAQBlock } from "./blocks/FAQBlock";
import { FormBlock } from "./blocks/FormBlock";
import { HeaderBlock } from "./blocks/HeaderBlock";
import { FooterBlock } from "./blocks/FooterBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { CountdownBlock } from "./blocks/CountdownBlock";
import { GalleryBlock } from "./blocks/GalleryBlock";
import { SocialProofBlock } from "./blocks/SocialProofBlock";
import { CustomHTMLBlock } from "./blocks/CustomHTMLBlock";
import { StatsBlock } from "./blocks/StatsBlock";
import { TeamBlock } from "./blocks/TeamBlock";
import { LogoCarouselBlock } from "./blocks/LogoCarouselBlock";
import { ComparisonBlock } from "./blocks/ComparisonBlock";
import { TabsBlock } from "./blocks/TabsBlock";
import { AccordionBlock } from "./blocks/AccordionBlock";
import { ProblemSolutionBlock } from "./blocks/ProblemSolutionBlock";
import { ProcessBlock } from "./blocks/ProcessBlock";
import { CaseStudiesBlock } from "./blocks/CaseStudiesBlock";
import { IntegrationsBlock } from "./blocks/IntegrationsBlock";
import { GuaranteeBlock } from "./blocks/GuaranteeBlock";
import { GenericBlock } from "./blocks/GenericBlock";

interface BlockRendererProps {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

const BLOCK_COMPONENTS: Record<
  string,
  React.ComponentType<BlockRendererProps>
> = {
  hero: HeroBlock,
  features: FeaturesBlock,
  testimonials: TestimonialsBlock,
  cta: CTABlock,
  pricing: PricingBlock,
  faq: FAQBlock,
  form: FormBlock,
  header: HeaderBlock,
  footer: FooterBlock,
  video: VideoBlock,
  countdown: CountdownBlock,
  gallery: GalleryBlock,
  "social-proof": SocialProofBlock,
  "custom-html": CustomHTMLBlock,
  stats: StatsBlock,
  team: TeamBlock,
  "logo-carousel": LogoCarouselBlock,
  comparison: ComparisonBlock,
  tabs: TabsBlock,
  accordion: AccordionBlock,
  "problem-solution": ProblemSolutionBlock,
  process: ProcessBlock,
  "case-studies": CaseStudiesBlock,
  integrations: IntegrationsBlock,
  guarantee: GuaranteeBlock,
};

function bgLuminance(hex: string): number {
  const h = hex.replace("#", "");
  if (h.length < 6) return 0;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Replace any very light background with a dark slate so white sections never appear.
function darkifyBg(bg?: string): string | undefined {
  if (!bg) return undefined;
  return bgLuminance(bg) > 0.55 ? "#0f172a" : bg;
}

function autoTextColor(bg?: string): string | undefined {
  if (!bg) return undefined;
  const hex = bg.replace("#", "");
  if (hex.length < 6) return undefined;
  return bgLuminance(hex) > 0.45 ? "#1e293b" : "#f1f5f9";
}

export function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;
  const Component = BLOCK_COMPONENTS[block.type] || GenericBlock;

  const darkBg = block.styles.gradient ? undefined : darkifyBg(block.styles.backgroundColor);

  // Ensure textColor is readable against the effective background.
  // Covers two cases:
  // 1. Background was darkified (was light → now dark) but textColor is still dark.
  // 2. Background was already dark but textColor is also dark (author error in template).
  const effectiveBgLum = bgLuminance((darkBg ?? block.styles.backgroundColor) ?? "#0a0a14");
  const sanitizedTextColor = (() => {
    const tc = block.styles.textColor;
    if (!tc) return tc;
    const textLum = bgLuminance(tc);
    // Both bg and text are dark → text is invisible → force light
    if (effectiveBgLum < 0.45 && textLum < 0.35) return "#f1f5f9";
    // Both bg and text are light → text is invisible → force dark
    if (effectiveBgLum > 0.55 && textLum > 0.65) return "#0f172a";
    return tc;
  })();

  // Build a sanitized block so child components get the corrected textColor
  const effectiveBlock: typeof block = sanitizedTextColor !== block.styles.textColor
    ? { ...block, styles: { ...block.styles, textColor: sanitizedTextColor } }
    : block;

  const resolvedTextColor = sanitizedTextColor || autoTextColor(darkBg || block.styles.backgroundColor);
  const animationClass: Record<string, string> = {
    "fade-in": "pf-fade-in",
    "slide-up": "pf-fade-up",
    "slide-left": "pf-slide-left",
    "zoom-in": "pf-zoom-in",
    bounce: "pf-bounce-subtle",
    none: "",
  };
  const hoverClass: Record<string, string> = {
    lift: "transition-transform duration-300 hover:-translate-y-1",
    glow: "transition-shadow duration-300 hover:shadow-2xl",
    scale: "transition-transform duration-300 hover:scale-[1.01]",
    none: "",
  };

  const style: React.CSSProperties = {
    backgroundColor: darkBg,
    color: resolvedTextColor,
    paddingTop: block.styles.paddingTop,
    paddingBottom: block.styles.paddingBottom,
    paddingLeft: block.styles.paddingLeft,
    paddingRight: block.styles.paddingRight,
    marginTop: block.styles.marginTop,
    marginBottom: block.styles.marginBottom,
    borderRadius: block.styles.borderRadius,
    borderWidth: block.styles.borderWidth,
    borderColor: block.styles.borderColor,
    borderStyle: block.styles.borderWidth ? "solid" : undefined,
    opacity: block.styles.opacity,
    backgroundImage: block.styles.gradient || (block.styles.backgroundImage
      ? `url(${block.styles.backgroundImage})`
      : undefined),
    backgroundSize: block.styles.backgroundSize || "cover",
    backgroundPosition: "center",
    boxShadow: block.styles.boxShadow,
    backdropFilter: block.styles.backdropBlur ? `blur(${block.styles.backdropBlur}px)` : undefined,
    animationDelay: block.styles.animationDelay ? `${block.styles.animationDelay}ms` : undefined,
    animationDuration: block.styles.animationDuration ? `${block.styles.animationDuration}ms` : undefined,
  };

  return (
    <div
      style={style}
      className={[
        "w-full",
        animationClass[block.styles.animation || "none"],
        hoverClass[block.styles.hoverEffect || "none"],
      ].filter(Boolean).join(" ")}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: effectiveBlock.styles.maxWidth || "1200px" }}
      >
        <Component {...props} block={effectiveBlock} />
      </div>
    </div>
  );
}
