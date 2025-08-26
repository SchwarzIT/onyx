import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/utils.js";

export type OnyxSegmentedControlProps = DensityProp & {
  /**
   * value of the active control element
   */
  modelValue?: Nullable<string>;
  /**
   * Whether to show a skeleton segmented control.
   */
  skeleton?: SkeletonInjected;
  /**
   * Array of options for the segmented control.
   */
  options: OnyxSegmentedControlOption[];
  /**
   * Same as the native `name` attribute of `<input>`.
   * Used to reference the input in JavaScript or in submitted form data.
   */
  name?: string;
};

export type OnyxSegmentedControlOption = {
  /**
   * unique identifier for the option
   */
  value: string;
  /**
   * Label for the option.
   */
  label?: string;
  /**
   * Icon for the option. If an icon widthout a label is provided the width of tie control will be `fit-content`
   */
  icon?: string;
  /**
   * Whether the option is disabled or not.
   */
  disabled?: boolean;
};
