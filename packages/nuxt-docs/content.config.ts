import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: "page",
      source: "index.md",
    }),
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        layout: z.enum(["default", "test"]).optional(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        date: z.string(),
        image: z.string(),
      }),
    }),
  },
});
