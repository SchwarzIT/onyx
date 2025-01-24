import type { SharedTextInputProps } from "../../composables/useLenientMaxLengthValidation";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

export type OnyxInputProps = SharedFormElementProps &
  SharedTextInputProps & {
    /**
     * Input type.
     */
    type?: InputType;
    /**
     * Pattern the value must match to be valid.
     */
    pattern?: string | RegExp;
    /**
     * Whether to hide the check icon when the input is in a success state.
     */
    hideSuccessIcon?: boolean;
    /**
     * Whether to hide the clear icon when the input is filled and focused.
     */
    hideClearIcon?: boolean;
  };

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
