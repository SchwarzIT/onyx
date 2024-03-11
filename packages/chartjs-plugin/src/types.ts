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
     * onyx chart options. Can be set to `false` for disabling the plugin.
     */
    onyx: OnyxChartOptions | false;
  }
}
