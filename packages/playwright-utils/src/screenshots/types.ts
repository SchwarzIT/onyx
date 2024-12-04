import type { MountResultJsx, test } from "@playwright/experimental-ct-vue";
import type { JSX } from "vue/jsx-runtime";

export type MatrixScreenshotTestOptions<
  TColumn extends string = string,
  TRow extends string = string,
> = {
  /**
   * Test name. Will be displayed above the matrix screenshot and be used as filename.
   */
  name: string;
  /**
   * Matrix columns. Must not contain spaces.
   */
  columns: readonly TColumn[];
  /**
   * Matrix rows. Must not contain spaces.
   */
  rows: readonly TRow[];
  /**
   * Function that returns the component for the given column and row.
   */
  component: (column: TColumn, row: TRow) => JSX.Element;
  /**
   * Optional callback to be executed before capturing the screenshot.
   * Useful for performing `expect()` or e.g. hover, focus-visible state etc.
   */
  beforeScreenshot?: (
    component: MountResultJsx,
    page: TestArgs["page"],
    column: TColumn,
    row: TRow,
  ) => Promise<void>;
  /**
   * Rules to disable when performing the accessibility tests.
   * **IMPORTANT**: Should be avoided! If used, please include a comment why it is needed
   * and if possible create a GitHub issue with follow up work on it.
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

type TestArgs = Parameters<Parameters<typeof test>[2]>[0];
