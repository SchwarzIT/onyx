import type { Browser } from "../../scripts/browserslistrc.js";

/**
 * @see https://nuxt.com/docs/guide/going-further/runtime-config#typing-runtime-config
 */
declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    /**
     * List of browsers supported by onyx, parsed from `.browserslistrc`.
     */
    browsers: Browser[];
  }
}

export {};
