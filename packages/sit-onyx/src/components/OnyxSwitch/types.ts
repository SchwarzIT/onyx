import type { BaseSelectOption, Nullable, SelectOptionValue } from "../../types/index.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxSwitchProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "value" | "label"
> &
  Pick<OnyxFormElementV2Props, "label"> & {
    /**
     * Whether the switch should be checked or not.
     */
    modelValue?: Nullable<boolean>;
    /**
     * The text label displayed directly next to the switch.
     * Can be a single string for a static label, or an object with `truthy` and `falsy` properties
     * to display different texts based on the checked state of the switch.
     */
    valueLabel?: string | { truthy: string; falsy: string };
  };
