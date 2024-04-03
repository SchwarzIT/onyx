import type { RequiredMarkerProp } from "../../composables/required";
import type { SelectOption, SelectOptionValue } from "../../types";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  SelectOption<TValue> &
    RequiredMarkerProp & {
      /**
       * Whether the checkbox is checked.
       */
      modelValue?: boolean;
      /**
       * If `true`, an indeterminate indicator is shown.
       */
      indeterminate?: boolean;
    };
