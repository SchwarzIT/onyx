import AxeBuilder from "@axe-core/playwright";
import { test as base } from "@playwright/experimental-ct-vue";
import { a11yTags } from "../a11yConfig";

export { expect } from "@playwright/experimental-ct-vue";

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

/**
 * Playwright axe accessibility rules that should be disabled by default.
 *
 * TODO: re-enable color-contrast rule when color contrasts issues are fixed in:
 * https://github.com/SchwarzIT/onyx/issues/2250
 */
export const DEFAULT_DISABLED_AXE_RULES = ["color-contrast"];

/**
 * Extends Playwright's base test by providing `makeAxeBuilder`
 * This new `test` can be used in multiple test files, and each of them will get
 * a consistently configured AxeBuilder instance.
 *
 * @see https://playwright.dev/docs/accessibility-testing#using-a-test-fixture-for-common-axe-configuration
 */
export const test: ReturnType<typeof base.extend<AxeFixture>> = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => {
      return new AxeBuilder({ page }).withTags(a11yTags).disableRules(DEFAULT_DISABLED_AXE_RULES);
    };

    await use(makeAxeBuilder);
  },
});
