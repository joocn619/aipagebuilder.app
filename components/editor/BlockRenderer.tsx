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
};

// Returns a safe foreground color when a block has an explicit background but no textColor.
// Prevents invisible text when dark-mode CSS vars meet a light inline background (or vice versa).
function autoTextColor(bg?: string): string | undefined {
  if (!bg) return undefined;
  const hex = bg.replace("#", "");
  if (hex.length < 6) return undefined;
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.45 ? "#1e293b" : "#f1f5f9";
}

export function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;
  const Component = BLOCK_COMPONENTS[block.type] || GenericBlock;

  const resolvedTextColor = block.styles.textColor || autoTextColor(block.styles.backgroundColor);

  const style: React.CSSProperties = {
    backgroundColor: block.styles.backgroundColor,
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
    backgroundImage: block.styles.backgroundImage
      ? `url(${block.styles.backgroundImage})`
      : undefined,
    backgroundSize: block.styles.backgroundSize || "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={style} className="w-full">
      <div
        className="mx-auto w-full"
        style={{ maxWidth: block.styles.maxWidth || "1200px" }}
      >
        <Component {...props} />
      </div>
    </div>
  );
}
