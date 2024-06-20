import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { AutofocusProp, BaseSelectOption, Direction, SelectOptionValue } from "../../types";

export type OnyxRadioButtonGroupProps<TValue extends SelectOptionValue = SelectOptionValue> =
  DensityProp &
    RequiredMarkerProp &
    CustomValidityProp & {
      /**
       * Options for the individual radio buttons of the group.
       */
      options: RadioButtonOption<TValue>[];
      /**
       * Unique name for the radio button group form element.
       * Will automatically filled, when it is not given.
       * Warning: Never use a name for form elements twice!
       */
      name?: string;
      /**
       * The selected radio button option.
       */
      modelValue?: TValue;
      /**
       * Headline shown above the radio button group, which is also the fieldset legend.
       * It will also show the required indicator, if `require` is set to `true`
       */
      headline?: string;
      /**
       * Disable the radio button group.
       */
      disabled?: boolean;
      /**
       * Direction of the checkboxes. Can be vertical (default) or horizontal.
       */
      direction?: Direction;
      /**
       * If set, the specified number of skeleton radio buttons will be shown.
       */
      skeleton?: number;
    };

export type RadioButtonOption<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "hideLabel"
> &
  AutofocusProp;
