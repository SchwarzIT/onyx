import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

/**
 * @see: https://nuxt.com/docs/4.x/getting-started/testing#setup
 */
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["tests/{e2e,unit}/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["tests/nuxt/*.{test,spec}.ts"],
          environment: "nuxt",
        },
      }),
    ],
  },
});
