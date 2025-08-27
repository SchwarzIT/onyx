import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { BaseSelectOption, SelectOptionValue } from "../../types/components.js";

export type OnyxSegmentedControlProps<TValue extends SelectOptionValue = SelectOptionValue> =
  DensityProp & {
    /**
     * Value of the active control element.
     */
    modelValue: TValue;
    /**
     * Whether to show a skeleton segmented control.
     */
    skeleton?: SkeletonInjected;
    /**
     * Array of options for the segmented control.
     */
    options: OnyxSegmentedControlOption<TValue>[];
    /**
     * Same as the native `name` attribute of `<input>`.
     * Used to reference the input in JavaScript or in submitted form data.
     */
    name?: string;
  };

export type OnyxSegmentedControlOption<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  BaseSelectOption<TValue>,
  "value" | "label" | "hideLabel" | "autofocus" | "disabled"
> & {
  /**
   * Icon for the option. If an icon is provided and `hideLabel` is set the width of the control will be `fit-content`.
   */
  icon?: string;
};
