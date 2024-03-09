import type { ChartType } from "chart.js";

export type OnyxChartOptions = {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    onyx: OnyxChartOptions | false;
  }
}
