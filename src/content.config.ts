import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    problem: z.string().optional(),
    role: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: z.enum(["completed", "in-progress", "archived"]).default("completed"),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    image: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      "software-engineering",
      "ai",
      "system-design",
      "web-development",
      "entrepreneurship",
      "zimbabwe-tech",
      "learning",
    ]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experiments" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    problem: z.string().optional(),
    hypothesis: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    status: z.enum(["active", "completed", "paused"]).default("active"),
    publishedAt: z.coerce.date().optional(),
  }),
});

const speaking = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/speaking" }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    topic: z.string().optional(),
    type: z.enum(["talk", "workshop", "panel", "keynote"]).default("talk"),
    slides: z.string().url().optional(),
    video: z.string().url().optional(),
  }),
});

export const collections = { projects, posts, experiments, speaking };
