import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: [
    // MDC syntax with YAML properties for components is not supported yet
    // see: https://github.com/oxc-project/oxc/issues/18740
    "apps/showcase/content/**/*.md",
  ],
});
