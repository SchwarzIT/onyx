import type { BaseSelectOption, SelectOptionValue } from "../../types";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core";

export type OnyxSwitchProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "value"
> &
  FormInjectedProps & {
    /**
     * Whether the switch should be checked or not.
     */
    modelValue?: boolean;
  };
