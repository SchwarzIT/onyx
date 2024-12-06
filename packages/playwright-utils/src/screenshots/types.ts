import type AxeBuilder from "@axe-core/playwright";
import type { expect, MountResultJsx, test } from "@playwright/experimental-ct-vue";
import type { JSX } from "vue/jsx-runtime";

export type UseMatrixScreenshotTestOptions = {
  /**
   * Test function to use. Must support a axe fixture for accessibility testing.
   *
   * @see https://playwright.dev/docs/accessibility-testing#using-a-test-fixture-for-common-axe-configuration
   */
  test: ReturnType<typeof test.extend<AxeFixture>>;
  /**
   * Playwright expect function to use.
   *
   * @example `import { expect } from "@playwright/experimental-ct-vue";`
   */
  expect: typeof expect;
  /**
   * Global default options for the matrix screenshot tests.
   * Will be merged with the options passed to a single screenshot test.
   */
  defaults?: Partial<
    Pick<MatrixScreenshotTestOptions, "disabledAccessibilityRules" | "disablePadding">
  >;
};

export type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

export type MatrixScreenshotTestOptions<
  TColumn extends string = string,
  TRow extends string = string,
> = {
  /**
   * Test name. Will be displayed above the matrix screenshot and be used as filename.
   */
  name: string;
  /**
   * Matrix columns.
   */
  columns: readonly TColumn[];
  /**
   * Matrix rows.
   */
  rows: readonly TRow[];
  /**
   * Function that returns the component for the given column and row.
   */
  component: (column: TColumn, row: TRow) => JSX.Element;
  /**
   * Optional callback to be executed before capturing the screenshot.
   * Useful for performing `expect()` or e.g. hover, focus-visible state etc.
   * Focus and mouse will be reset after each screenshot.
   */
  beforeScreenshot?: ScreenshotTestHook<TColumn, TRow>;
  /**
   * Optional callback to be executed after capturing the screenshot.
   * Useful for performing clean ups of side effects created by `beforeScreenshot`.
   * Focus and mouse will be reset after each screenshot.
   */
  afterScreenshot?: ScreenshotTestHook<TColumn, TRow>;
  /**
   * Rules to disable when performing the accessibility tests.
   * **IMPORTANT**: Should be avoided! If used, please include a comment why it is needed.
   *
   * @see https://playwright.dev/docs/accessibility-testing#disabling-individual-scan-rules
   */
  disabledAccessibilityRules?: string[];
  /**
   * If `true`, no padding will be added to the screenshots.
   * By default a `1rem` padding is added around the component/screenshot.
   */
  disablePadding?: boolean;
};

export type ScreenshotTestHook<TColumn extends string, TRow extends string> = (
  component: MountResultJsx,
  page: TestArgs["page"],
  column: TColumn,
  row: TRow,
) => Promise<void>;

export type TestArgs = Parameters<Parameters<typeof test>[2]>[0];
