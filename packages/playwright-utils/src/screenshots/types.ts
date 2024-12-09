import type { MountResultJsx, test } from "@playwright/experimental-ct-vue";
import type { JSX } from "vue/jsx-runtime";

export type UseMatrixScreenshotTestOptions<TContext extends HookContext = HookContext> = {
  /**
   * Global default options for the matrix screenshot tests.
   * Will be merged with the options passed to a single screenshot test.
   */
  defaults?: Partial<
    Pick<MatrixScreenshotTestOptions<string, string, TContext>, "removePadding" | "hooks">
  >;
};

export type MatrixScreenshotTestOptions<
  TColumn extends string = string,
  TRow extends string = string,
  TContext extends HookContext = HookContext,
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
   * Custom hooks/callbacks that can be executed at specific points in time during the matrix screenshot.
   */
  hooks?: ScreenshotTestHooks<TColumn, TRow, TContext>;
  /**
   * If `true`, no padding will be added to the screenshots.
   * By default a `1rem` padding is added around the component/screenshot.
   */
  removePadding?: boolean;
  /**
   * Context that is passed to all `hooks`.
   * Useful for passing options to (global) hooks per matrix screenshot, e.g. for disabling specific accessibility test rule.
   */
  context?: TContext;
};

export type ScreenshotTestHooks<
  TColumn extends string,
  TRow extends string,
  TContext extends HookContext = HookContext,
> = Partial<{
  /**
   * Optional callback to be executed before capturing each individual screenshot (column + row combination).
   * Useful for performing `expect()` or e.g. hover, focus-visible state etc.
   * Focus and mouse will be reset after each screenshot.
   */
  beforeEach: ScreenshotTestHook<TColumn, TRow, TContext>;
  /**
   * Optional callback to be executed after capturing each individual screenshot (column + row combination).
   * Useful for performing clean ups of side effects created by the `beforeEach` hook.
   * Focus and mouse will be reset after each screenshot.
   */
  afterEach: ScreenshotTestHook<TColumn, TRow, TContext>;
}>;

export type ScreenshotTestHook<
  TColumn extends string,
  TRow extends string,
  TContext extends HookContext = HookContext,
> = (
  component: MountResultJsx,
  page: TestArgs["page"],
  column: TColumn,
  row: TRow,
  context?: TContext,
) => Promise<void>;

export type TestArgs = Parameters<Parameters<typeof test>[2]>[0];

export type HookContext = Record<PropertyKey, unknown>;
