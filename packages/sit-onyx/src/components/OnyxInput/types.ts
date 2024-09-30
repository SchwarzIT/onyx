import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { AutofocusProp } from "../../types";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";
import type { OnyxFormElementProps } from "../OnyxFormElement/types";

export type OnyxInputProps = DensityProp &
  RequiredMarkerProp &
  CustomValidityProp &
  Omit<OnyxFormElementProps, "modelValue" | "errorMessages"> &
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
     * Same as the native `name` attribute of `<input>`.
     * Used to reference the input in JavaScript or in submitted form data.
     */
    name?: string;
    /**
     * Pattern the value must match to be valid.
     */
    pattern?: string | RegExp;
    /**
     * Whether the input should be readonly.
     */
    readonly?: boolean;
    /**
     * Whether the input should be disabled.
     */
    disabled?: FormInjected<boolean>;
    /**
     * Whether the input is loading. User interaction will be disabled.
     */
    loading?: boolean;
    /**
     * Minimum number of characters that have to to be entered.
     * Warning: when the value is (pre)set programatically,
     * the input invalidity will not be detected by the browser, it will only turn invalid
     * as soon as a user interacts with the input (types something).
     */
    minlength?: number;
    /**
     * Whether to show a skeleton input.
     */
    skeleton?: boolean;
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
