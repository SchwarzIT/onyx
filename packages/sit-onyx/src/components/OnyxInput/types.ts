import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp } from "../../types";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core";
import type { SharedFormElementProps } from "../OnyxFormElement/types";

export type OnyxInputProps = FormInjectedProps &
  DensityProp &
  RequiredMarkerProp &
  CustomValidityProp &
  Omit<SharedFormElementProps, "modelValue" | "errorMessages"> &
  AutofocusProp & {
    /**
     * Current value of the input.
     */
    modelValue?: string;
    /**
     * Input type.
     */
    type?: InputType;
    /**
     * Placeholder to show when the value is empty.
     */
    placeholder?: string;
    /**
     * If and how text should be automatically be capitalized when using non-physical keyboards
     * (such as virtual keyboard on mobile devices or voice input).
     *
     * Has no effect when `type` is set to "url", "email" or "password".
     *
     * @see [MDN autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)
     */
    autocapitalize?: Autocapitalize;
    /**
     * Specify how to provide automated assistance in filling out the input.
     * Some autocomplete values might required specific browser permissions to be allowed by the user.
     * Also browsers might require a `name` property.
     *
     * @see [MDN autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    autocomplete?: Autocomplete;
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
     * Minimum number of characters that have to to be entered.
     * Warning: when the value is (pre)set programmatically,
     * the input invalidity will not be detected by the browser, it will only turn invalid
     * as soon as a user interacts with the input (types something).
     */
    minlength?: number;
    /**
     * Whether to show a skeleton input.
     */
    skeleton?: SkeletonInjected;
  };

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];

/**
 * @see [MDN autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)
 */
export const AUTOCAPITALIZE = ["none", "sentences", "words", "characters"] as const;
export type Autocapitalize = (typeof AUTOCAPITALIZE)[number];

/**
 * Same as TypeScript native "Autofill" type but without "AutoFillSection" because
 * the Vue compiler currently can not handle it (too complex union type).
 *
 * @since TypeScript version 5.2
 */
export type Autocomplete = Exclude<AutoFill, AutoFillSection | "">;
