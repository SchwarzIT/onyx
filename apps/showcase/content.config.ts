import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: { include: "en/**", exclude: ["*/components/**"], prefix: "/" },
      schema: z.object({
        hero: z
          .object({
            image: z
              .union([
                z.string(),
                z.object({
                  light: z.string(),
                  dark: z.string(),
                }),
              ])
              .optional(),
          })
          .optional(),
      }),
    }),
    components_en: defineCollection({
      type: "page",
      source: { include: "en/components/**", exclude: ["**/*.vue"], prefix: "/components" },
      schema: z.object({
        componentName: z.string(),
        status: z.enum(["new", "beta"]).optional(),
      }),
    }),
  },
});
