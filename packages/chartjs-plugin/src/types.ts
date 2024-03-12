import type { ChartType } from "chart.js";
import type { DeepPartial, OnyxColor } from "sit-onyx/types";

export type OnyxChartOptions = {
  /**
   * Main chart color.
   */
  color: OnyxColor;
};

declare module "chart.js" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we don't need the generic here but it is needed because of "All declarations of 'PluginOptionsByType' must have identical type parameters." error
  interface PluginOptionsByType<TType extends ChartType> {
    /**
     * onyx chart plugin options.
     */
    onyx: DeepPartial<OnyxChartOptions>;
  }
}
