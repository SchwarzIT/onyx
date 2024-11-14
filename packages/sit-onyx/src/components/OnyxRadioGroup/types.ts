import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp, BaseSelectOption, Direction, SelectOptionValue } from "../../types";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

export type OnyxRadioGroupProps<TValue extends SelectOptionValue = SelectOptionValue> =
  DensityProp &
    RequiredMarkerProp &
    CustomValidityProp &
    Pick<BaseSelectOption, "truncation"> &
    Pick<SharedFormElementProps, "label" | "hideLabel" | "name"> & {
      /**
       * Options for the individual radio buttons of the group.
       */
      options: RadioButtonOption<TValue>[];
      /**
       * The selected radio button option.
       */
      modelValue?: TValue;
      /**
       * Disable the radio group.
       */
      disabled?: FormInjected<boolean>;
      /**
       * Direction of the checkboxes. Can be vertical (default) or horizontal.
       */
      direction?: Direction;
      /**
       * If set, the specified number of skeleton radio buttons will be shown.
       */
      skeleton?: SkeletonInjected;
    };

export type RadioButtonOption<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "hideLabel"
> &
  AutofocusProp;
