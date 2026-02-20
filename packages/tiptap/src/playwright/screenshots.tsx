import { useMatrixScreenshotTest } from "@sit-onyx/playwright-utils";
import { createAxeBuilder, DEFAULT_DISABLED_AXE_RULES, expect } from "../playwright/a11y.js";

export type OnyxMatrixScreenshotHookContext = {
  /**
   * Rules to disable when performing the accessibility tests.
   * **IMPORTANT**: Should be avoided! If used, please include a comment why it is needed.
   *
   * @see https://playwright.dev/docs/accessibility-testing#disabling-individual-scan-rules
   */
  disabledAccessibilityRules?: string[];
};

export const { executeMatrixScreenshotTest } =
  useMatrixScreenshotTest<OnyxMatrixScreenshotHookContext>({
    defaults: {
      hooks: {
        afterEach: async (component, page, column, row, context) => {
          // ARRANGE (execute accessibility tests)
          const axeBuilder = createAxeBuilder(page);

          if (context?.disabledAccessibilityRules?.length) {
            axeBuilder.disableRules(
              DEFAULT_DISABLED_AXE_RULES.concat(context.disabledAccessibilityRules),
            );
          }

          const accessibilityScanResults = await axeBuilder.analyze();

          // ASSERT
          expect(
            accessibilityScanResults.violations,
            `should pass accessibility checks for ${column} ${row}`,
          ).toEqual([]);
        },
      },
    },
  });
