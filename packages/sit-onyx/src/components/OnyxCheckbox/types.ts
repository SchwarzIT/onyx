import type { BaseSelectOption, NullableBoolean, SelectOptionValue } from "../../types/index.js";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> & {
    /**
     * Whether the checkbox is checked.
     */
    modelValue?: NullableBoolean;
    /**
     * If `true`, an indeterminate indicator is shown.
     */
    indeterminate?: boolean;
  };
