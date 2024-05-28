import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { BaseSelectOption, SelectOptionValue } from "../../types";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> &
    RequiredMarkerProp &
    CustomValidityProp & {
      /**
       * Whether the checkbox is checked.
       */
      modelValue?: boolean;
      /**
       * If `true`, an indeterminate indicator is shown.
       */
      indeterminate?: boolean;
    };
