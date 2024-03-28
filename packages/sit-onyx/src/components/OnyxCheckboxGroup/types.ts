import type { DensityProp } from "../../composables/density";
import type { Direction } from "../../types";
import type { OnyxCheckboxProps } from "../OnyxCheckbox/types";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";

export type OnyxCheckboxGroupProps<TValue extends SelectionOptionValue = SelectionOptionValue> =
  DensityProp & {
    /**
     * Checkbox options.
     */
    options: CheckboxGroupOption<TValue>[];
    /**
     * Currently checked checkboxes.
     */
    modelValue?: TValue[];
    /**
     * Headline to show above all checkboxes which is also the fieldset legend.
     */
    headline?: string;
    /**
     * Direction of the checkboxes.
     */
    direction?: Direction;
    /**
     * If true, an additional checkbox will be displayed to check/uncheck all options.
     * Disabled and skeleton checkboxes will be excluded from the check/uncheck behavior.
     */
    withCheckAll?: boolean;
    /**
     * Checkbox label if property `withCheckAll` is enabled.
     * If unset, a default label will be shown depending on the current locale/language.
     */
    checkAllLabel?: string;
    /**
     * Whether all checkboxes should be disabled.
     */
    disabled?: boolean;
    /**
     * If set, the specified number of skeleton radio buttons will be shown.
     */
    skeleton?: number;
  };

export type CheckboxGroupOption<T extends SelectionOptionValue> = Omit<
  OnyxCheckboxProps,
  "modelValue" | "indeterminate" | "hideLabel"
> & {
  id: T;
};
