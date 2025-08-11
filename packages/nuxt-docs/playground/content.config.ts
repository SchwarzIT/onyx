import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // content_en is registered by default in @sit-onyx/nuxt-docs so there is no need to register it manually here
    content_de: defineCollection({
      type: "page",
      source: { include: "de/**", prefix: "" },
    }),
  },
});
