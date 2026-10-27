import type { InjectionKey } from "vue";
import type {
  AutofocusProp,
  BaseSelectOption,
  Nullable,
  Orientation,
  SelectOptionValue,
} from "../../types/index.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { FormElementV2Tooltip, OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

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
    | "error"
    | "required"
    | "requiredMarker"
    | "disabled"
    | "showError"
    | "reserveMessageSpace"
  > &
  Pick<OnyxFormElementV2Props, "message" | "success"> & {
    /**
     * Options for the individual radio buttons of the group.
     */
    options: RadioButtonOption<TValue>[];
    /**
     * The selected radio button option.
     */
    modelValue?: Nullable<TValue>;
    /**
     * Orientation of the radio buttons. Can be vertical (default) or horizontal.
     */
    orientation?: Orientation;
  };

export type RadioButtonOption<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "hideLabel"
> &
  AutofocusProp;

export type RadioGroupContext = {
  /**
   * Function to report an error.
   */
  reportError: (id: string, error: string | FormElementV2Tooltip | undefined) => void;
  /**
   * Function to unregister a radio button from the context.
   */
  unregister: (id: string) => void;
};

export const RADIO_GROUP_INJECTION_KEY: InjectionKey<RadioGroupContext> = Symbol(
  "RADIO_GROUP_INJECTION_KEY",
);
