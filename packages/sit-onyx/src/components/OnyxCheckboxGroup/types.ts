import type { InjectionKey } from "vue";
import type { RequiredProp } from "../../composables/required.js";
import type { CustomValidityProp } from "../../composables/useFormElementError.js";
import type {
  AutofocusProp,
  BaseSelectOption,
  Nullable,
  Orientation,
  SelectOptionValue,
} from "../../types/index.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { FormElementV2Tooltip, OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxCheckboxGroupProps<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  BaseSelectOption,
  "truncation"
> &
  Pick<
    SharedFormElementProps,
    | "label"
    | "labelTooltip"
    | "hideLabel"
    | "density"
    | "skeleton"
    | "disabled"
    | "requiredMarker"
    | "error"
    | "showError"
    | "reserveMessageSpace"
  > &
  Pick<OnyxFormElementV2Props, "message" | "success"> & {
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

export type CheckboxGroupOption<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "hideLabel" | "label"
> &
  Pick<OnyxFormElementV2Props, "label"> &
  RequiredProp &
  CustomValidityProp &
  AutofocusProp;

export type CheckboxGroupContext = {
  /**
   * Function to report an error.
   */
  reportError: (id: string, error: string | FormElementV2Tooltip | undefined) => void;
  /**
   * Function to unregister a checkbox from the context.
   */
  unregister: (id: string) => void;
};

export const CHECKBOX_GROUP_INJECTION_KEY: InjectionKey<CheckboxGroupContext> = Symbol(
  "CHECKBOX_GROUP_INJECTION_KEY",
);
