import type { CustomValidityProp } from "src/composables/useCustomValidity";
import type { SelectOption } from "../..";
import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { AutofocusProp, SelectOptionValue } from "../../types";
import type { OnyxFormElementProps } from "../OnyxFormElement/types";

export const MULTISELECT_TEXT_MODE = ["summary", "preview"] as const;
export type MultiselectTextMode = (typeof MULTISELECT_TEXT_MODE)[number];

/**
 * Whether multiple values can be selected.
 */
export type SelectionInput<TValue extends SelectOptionValue = SelectOptionValue> =
  | {
      /**
       * Current value of the select.
       */
      selection?: SelectInputModelValue<TValue>;
      textMode?: undefined;
    }
  | {
      selection?: SelectInputModelValue<TValue>[];
      /**
       * How the multiselect value will be displayed in the input.
       * - summary (default): will show "x Selected" if more than 1 is selected.
       * - preview: will show the names of the selection as a truncated list.
       *            A number-badge appears next to it including a tooltip with all selected names.
       * Has no effect on single select mode.
       */
      textMode?: MultiselectTextMode;
    };

export type SelectInputModelValue<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  SelectOption<TValue>,
  "value" | "label"
>;

export type OnyxSelectInputProps<TValue extends SelectOptionValue> = DensityProp &
  RequiredMarkerProp &
  CustomValidityProp &
  SelectionInput<TValue> &
  AutofocusProp &
  Omit<OnyxFormElementProps, "modelValue" | "maxlength" | "withCounter"> & {
    /**
     * Whether the select should be disabled.
     */
    disabled?: boolean;
    /**
     * Whether to show a skeleton select.
     */
    skeleton?: boolean;
    /**
     * Whether the select should be readonly.
     */
    readonly?: boolean;
    /**
     * Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * Placeholder to show when the value is empty.
     */
    placeholder?: string;
    /**
     * Highlight input as if it has focus.
     */
    showFocus?: boolean;
  };
