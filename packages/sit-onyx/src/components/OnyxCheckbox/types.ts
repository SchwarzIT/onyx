import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { AutofocusProp, BaseSelectOption, SelectOptionValue } from "../../types";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> &
    RequiredMarkerProp &
    CustomValidityProp &
    AutofocusProp & {
      /**
       * Whether the checkbox is checked.
       */
      modelValue?: boolean;
      /**
       * If `true`, an indeterminate indicator is shown.
       */
      indeterminate?: boolean;
    };
