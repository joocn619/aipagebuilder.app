import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const pageSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export const profileSchema = z.object({
  full_name: z.string().min(1).max(100).optional(),
  avatar_url: z.string().url().optional(),
});
