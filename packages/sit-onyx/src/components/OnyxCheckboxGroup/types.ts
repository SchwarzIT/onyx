import type { RequiredProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type {
  AutofocusProp,
  BaseSelectOption,
  Direction,
  Nullable,
  SelectOptionValue,
} from "../../types";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

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
     * Direction of the checkboxes.
     */
    direction?: Direction;
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
