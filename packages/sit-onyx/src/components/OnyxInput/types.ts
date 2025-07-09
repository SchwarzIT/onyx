import type { SharedTextInputProps } from "../../composables/useLenientMaxLengthValidation.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxInputProps = SharedFormElementProps &
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
     */
    hideSuccessIcon?: boolean;
    /**
     * Whether to hide the clear icon when the input is filled and focused.
     */
    hideClearIcon?: boolean;
  };

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
