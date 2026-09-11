import path from "node:path";
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: [
        // include files from content folder of the extending app
        { cwd: path.resolve("content"), include: "en/**", prefix: "/" },
        // include files from playground (mainly needed for this monorepo)
        { cwd: path.resolve("playground/content"), include: "en/**", prefix: "/" },
      ],
    }),
  },
});
