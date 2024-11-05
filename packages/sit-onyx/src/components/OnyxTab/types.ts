import type { DensityProp } from "../../composables/density";

export type OnyxTabProps = DensityProp & {
  value: PropertyKey;
  /**
   * Tab label to display. Alternatively, the `tab` slot can be used.
   */
  label?: string;
};
