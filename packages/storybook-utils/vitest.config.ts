import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.spec.ts"],
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      include: ["src"],
      provider: "v8",
    },
  },
});
