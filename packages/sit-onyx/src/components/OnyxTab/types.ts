import type { DensityProp } from "../../composables/density";

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
   * Whether the input should be disabled and prevent the user from interacting with it.
   */
  disabled?: boolean;
};
