import type { DensityProp } from "../../composables/density";
import type { RequiredProp } from "../../composables/required";
import type {
  CustomMessageType,
  CustomValidityProp,
  FormMessages,
} from "../../composables/useCustomValidity";
import type { SharedTextInputProps } from "../../composables/useLenientMaxLengthValidation";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { AutofocusProp, Nullable } from "../../types";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core";

export type OnyxFormElementProps<T> = Omit<
  SharedFormElementProps,
  "error" | "message" | "success"
> &
  Omit<SharedTextInputProps, "modelValue"> & {
    errorMessages?: FormMessages;
    message?: FormMessages;
    successMessages?: FormMessages;
    modelValue?: Nullable<T>;
  };

export type SharedFormElementProps = FormInjectedProps &
  RequiredProp &
  DensityProp &
  CustomValidityProp &
  AutofocusProp & {
    /**
     * The id of a labelable form-related element.
     * If not given an id will be generated.
     * The id is passed as a `default` slot property.
     */
    id?: string;
    /**
     * Same as the native `name` attribute of `<input>`.
     * Used to reference the input in JavaScript or in submitted form data.
     */
    name?: string;
    /**
     * Label to show above the form element. Required due to accessibility / screen readers.
     * If you want to visually hide the label, use the `hideLabel` property.
     * TODO: make CustomMessageType
     */
    label: string;
    /**
     * Info text to show inside a tooltip, next to the label.
     * The tooltip will be hidden if `hideLabel` property is set to true.
     */
    labelTooltip?: string;
    /**
     * If `true`, the label will be visually hidden and
     * the `title` attribute will be set by the form element (input/textarea/...).
     * For accessibility / screen readers, the aria-label will still be set.
     */
    hideLabel?: boolean;
    /**
     * Whether the input should be readonly.
     */
    readonly?: boolean;
    /**
     * Whether the input is loading. User interaction will be disabled.
     */
    loading?: boolean;
    /**
     * Whether to show a skeleton input.
     */
    skeleton?: SkeletonInjected;
    /**
     * Error messages that gives details about the cause of a form elements invalidity.
     */
    error?: CustomMessageType;
    /**
     * Message / help text to display below the form element.
     * Will be replaced by an error message if the form element is invalid.
     */
    message?: CustomMessageType;
    /**
     * Success messages that inform about the state of form components
     */
    success?: CustomMessageType;
    /**
     * Placeholder to show when the value is empty.
     */
    placeholder?: string;
  };
