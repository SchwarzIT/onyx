import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: { include: "en/**", prefix: "/" },
      schema: z.object({
        hero: z
          .object({
            image: z.string().optional(),
          })
          .optional(),
      }),
    }),
  },
});
