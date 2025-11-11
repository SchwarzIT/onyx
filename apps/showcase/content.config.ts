import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: { include: "en/**", prefix: "" },
    }),
  },
});
