import type { BaseSelectOption, Nullable, SelectOptionValue } from "../../types/index.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxSwitchProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "value" | "label"
> &
  Pick<SharedFormElementProps, "message" | "success"> &
  Pick<OnyxFormElementV2Props, "label"> & {
    /**
     * Whether the switch should be checked or not.
     */
    modelValue?: Nullable<boolean>;
    /**
     * The text label displayed directly next to the switch.
     * Displays different texts based on the checked state of the switch.
     */
    valueLabel?: { truthy: string; falsy: string };
  };
