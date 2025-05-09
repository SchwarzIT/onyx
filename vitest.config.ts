import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: ["{packages,apps}/*"],
    coverage: {
      reporter: ["lcov"],
    },
    include: ["src"],
    exclude: ["src/**/*.stories.ts"],
  },
});
