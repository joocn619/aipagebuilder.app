export interface BlockConfig {
  id: string;
  name: string;
  category: string;
  thumbnail?: string;
  defaultContent: Record<string, unknown>;
  defaultStyles: Record<string, unknown>;
  isPro: boolean;
}

export interface HeroBlockContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
  videoUrl?: string;
  alignment: "left" | "center" | "right";
}

export interface FeaturesBlockContent {
  heading: string;
  subheading?: string;
  layout: "grid" | "list" | "alternating";
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface TestimonialsBlockContent {
  heading: string;
  layout: "carousel" | "grid" | "single";
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    content: string;
    avatarUrl?: string;
    rating?: number;
  }>;
}

export interface FormBlockContent {
  heading: string;
  description?: string;
  fields: Array<{
    type: "text" | "email" | "phone" | "textarea" | "select";
    label: string;
    placeholder?: string;
    required: boolean;
  }>;
  submitText: string;
  successMessage: string;
}
