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

export function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;
  const Component = BLOCK_COMPONENTS[block.type] || GenericBlock;

  const style: React.CSSProperties = {
    backgroundColor: block.styles.backgroundColor,
    color: block.styles.textColor,
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
