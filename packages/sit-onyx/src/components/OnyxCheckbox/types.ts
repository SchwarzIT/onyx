import type { BaseSelectOption, Nullable, SelectOptionValue } from "../../types/index.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  OnyxFormElementV2Props,
  "label"
> &
  Omit<BaseSelectOption<TValue>, "label"> &
  Pick<
    SharedFormElementProps,
    "message" | "success" | "id" | "error" | "showError" | "requiredMarker" | "reserveMessageSpace"
  > & {
    /**
     * Whether the checkbox is checked.
     */
    modelValue?: Nullable<boolean>;
    /**
     * If `true`, an indeterminate indicator is shown.
     */
    indeterminate?: boolean;
  };
