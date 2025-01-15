import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SharedTextInputProps } from "../../composables/useLenientMaxLengthValidation";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp } from "../../types";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

export type OnyxInputProps = FormInjectedProps &
  DensityProp &
  RequiredMarkerProp &
  CustomValidityProp &
  SharedFormElementProps &
  SharedTextInputProps &
  AutofocusProp & {
    /**
     * Input type.
     */
    type?: InputType;
    /**
     * Placeholder to show when the value is empty.
     */
    placeholder?: string;
    /**
     * Pattern the value must match to be valid.
     */
    pattern?: string | RegExp;
    /**
     * Whether the input should be readonly.
     */
    readonly?: boolean;
    /**
     * Whether the input is loading. User interaction will be disabled.
     */
    loading?: boolean;
    /**
     * Whether to hide the check icon when the input is in a success state.
     */
    hideSuccessIcon?: boolean;
    /**
     * Whether to hide the clear icon when the input is filled and focused.
     */
    hideClearIcon?: boolean;
    /**
     * Whether to show a skeleton input.
     */
    skeleton?: SkeletonInjected;
  };

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
