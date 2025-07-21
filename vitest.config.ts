import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["{packages,apps}/*"],
    coverage: {
      reporter: ["lcov"],
    },
    include: ["src"],
    exclude: ["src/**/*.stories.ts"],
  },
});
