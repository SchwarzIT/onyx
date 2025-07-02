import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxTabProps = DensityProp & {
  /**
   * Value of the tab when its selected. Will be the `modelValue` / `v-model` of the `OnyxTabs` component.
   */
  value: PropertyKey;
  /**
   * Tab label to display. Alternatively, the `tab` slot can be used.
   */
  label?: string;
  /**
   * Whether the tab should be disabled and prevent the user from interacting with it.
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton tab.
   */
  skeleton?: SkeletonInjected;
};
