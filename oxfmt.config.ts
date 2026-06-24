import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: [
    // prettier can not handle the MDC syntax with YAML properties for components
    // see: https://github.com/nuxt/content/issues/1709
    "apps/showcase/content/**/*.md",
  ],
});
