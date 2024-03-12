import type { ChartType } from "chart.js";

export type OnyxChartOptions = {
  /**
   * Main chart color.
   */
  color: OnyxColor;
};

export const ONYX_COLORS = [
  "primary",
  "secondary",
  "neutral",
  "danger",
  "warning",
  "success",
  "info",
] as const;
export type OnyxColor = (typeof ONYX_COLORS)[number];

declare module "chart.js" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we don't need the generic here but it is needed because of "All declarations of 'PluginOptionsByType' must have identical type parameters." error
  interface PluginOptionsByType<TType extends ChartType> {
    /**
     * onyx chart plugin options.
     */
    onyx: DeepPartial<OnyxChartOptions>;
  }
}

/**
 * Recursive / deep implementation of TypeScript's built-in `Partial<T>` type.
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
