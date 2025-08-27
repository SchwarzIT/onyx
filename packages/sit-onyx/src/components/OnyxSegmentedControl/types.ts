import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { BaseSelectOption } from "../../types/components.js";

export type OnyxSegmentedControlProps = DensityProp & {
  /**
   * value of the active control element
   */
  "update:modelValue": [value: string];
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

export type OnyxSegmentedControlOption = Pick<
  BaseSelectOption,
  "value" | "label" | "hideLabel" | "autofocus" | "disabled"
> & {
  /**
   * Icon for the option. If an icon is provided and `hideLabel` is set the width of the control will be `fit-content`.
   */
  icon?: string;
};
