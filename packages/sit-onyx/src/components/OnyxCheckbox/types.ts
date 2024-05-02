import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SelectOption, SelectOptionValue } from "../../types";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  SelectOption<TValue> &
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
