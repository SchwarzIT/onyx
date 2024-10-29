import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp, BaseSelectOption, Direction, SelectOptionValue } from "../../types";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";
import type { OnyxFormElementProps } from "../OnyxFormElement/types";

export type OnyxCheckboxGroupProps<TValue extends SelectOptionValue = SelectOptionValue> =
  DensityProp &
    Pick<BaseSelectOption, "truncation"> &
    Pick<OnyxFormElementProps, "label" | "hideLabel"> & {
      /**
       * Checkbox options.
       */
      options: CheckboxGroupOption<TValue>[];
      /**
       * Currently checked checkboxes.
       */
      modelValue?: TValue[];
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
      /**
       * Whether all checkboxes should be disabled.
       */
      disabled?: FormInjected<boolean>;
      /**
       * If set, the specified number of skeleton radio buttons will be shown.
       */
      skeleton?: SkeletonInjected;
    };

export type CheckboxGroupOption<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> & RequiredMarkerProp & CustomValidityProp & AutofocusProp;
