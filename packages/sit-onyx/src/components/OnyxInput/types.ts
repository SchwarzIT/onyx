import type { SharedTextInputProps } from "../../composables/useLenientMaxLengthValidation.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxInputProps = Omit<SharedFormElementProps, "label"> &
  Pick<OnyxFormElementV2Props, "label"> &
  SharedTextInputProps & {
    /**
     * Input type.
     * For numeric inputs, we recommend using the [OnyxStepper](https://storybook.onyx.schwarz/?path=/docs/form-elements-stepper--docs).
     * For date inputs, refer to the [OnyxDatePicker](https://storybook.onyx.schwarz/?path=/docs/form-elements-datepicker--docs).
     */
    type?: InputType;
    /**
     * Pattern the value must match to be valid.
     */
    pattern?: string | RegExp;
    /**
     * Whether to hide the check icon when the input is in a success state.
     *
     * @deprecated This property is obsolete since the "success" state will no longer automatically show a "check" icon.
     * The "check" icon is intended as temporary feedback after a user action (e.g. clicking a copy button). Use the `trailingIcons` slot to manually show the icon if needed.
     */
    hideSuccessIcon?: boolean;
    /**
     * Whether to hide the clear icon when the input is filled and focused.
     */
    hideClearIcon?: boolean;
    /**
     * Show or hide the password value for input with `type="password"`.
     * If unset, the state will be managed internally.
     */
    showPassword?: boolean;
  };

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
