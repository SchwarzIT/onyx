import { defineVitestConfig } from "@nuxt/test-utils/config";

/**
 * Unit test configuration for Vitest.
 *
 * @see https://nuxt.com/docs/getting-started/testing#unit-testing
 */
export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    include: ["tests/unit/**.spec.ts"],
  },
});
