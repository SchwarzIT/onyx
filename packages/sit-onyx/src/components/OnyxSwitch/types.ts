import type { BaseSelectOption, Nullable, SelectOptionValue } from "../../types/index.js";
import type { FormElementV2LabelOptions } from "../OnyxFormElementV2/types.js";

export type OnyxSwitchProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "value"
> & {
  /**
   * Whether the switch should be checked or not.
   */
  modelValue?: Nullable<boolean>;
  /**
   * Optional top-level form label for the switch container.
   */
  descriptionLabel?: string | FormElementV2LabelOptions;
};
