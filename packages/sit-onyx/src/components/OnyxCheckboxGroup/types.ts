import type { RequiredProp } from "../../composables/required.js";
import type { CustomValidityProp } from "../../composables/useCustomValidity.js";
import type {
  AutofocusProp,
  BaseSelectOption,
  Nullable,
  Orientation,
  SelectOptionValue,
} from "../../types/index.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxCheckboxGroupProps<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  BaseSelectOption,
  "truncation"
> &
  Pick<
    SharedFormElementProps,
    "label" | "labelTooltip" | "hideLabel" | "density" | "skeleton" | "disabled" | "requiredMarker"
  > & {
    /**
     * Checkbox options.
     */
    options: CheckboxGroupOption<TValue>[];
    /**
     * Currently checked checkboxes.
     */
    modelValue?: Nullable<TValue[]>;
    /**
     * Orientation of the checkboxes.
     */
    orientation?: Orientation;
    /**
     * If true, an additional checkbox will be displayed to check/uncheck all options.
     * Disabled and skeleton checkboxes will be excluded from the check/uncheck behavior.
     */
    withCheckAll?:
      | boolean
      | {
          /**
           * Label for the `select all` checkbox.
           * If unset, a default label will be shown depending on the current locale/language.
           */
          label?: string;
        };
  };

export type CheckboxGroupOption<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> & RequiredProp & CustomValidityProp & AutofocusProp;
