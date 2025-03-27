import type { Nullable } from "../../composables/useVModel";
import type { AutofocusProp, BaseSelectOption, Direction, SelectOptionValue } from "../../types";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

export type OnyxRadioGroupProps<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  BaseSelectOption,
  "truncation"
> &
  Pick<
    SharedFormElementProps,
    | "skeleton"
    | "label"
    | "labelTooltip"
    | "hideLabel"
    | "name"
    | "density"
    | "customError"
    | "required"
    | "requiredMarker"
    | "disabled"
  > & {
    /**
     * Options for the individual radio buttons of the group.
     */
    options: RadioButtonOption<TValue>[];
    /**
     * The selected radio button option.
     */
    modelValue?: Nullable<TValue>;
    /**
     * Direction of the checkboxes. Can be vertical (default) or horizontal.
     */
    direction?: Direction;
  };

export type RadioButtonOption<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "hideLabel"
> &
  AutofocusProp;
