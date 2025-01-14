import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomMessageType, FormMessages } from "../../composables/useCustomValidity";

export type OnyxFormElementProps = Omit<SharedFormElementProps, "error" | "message" | "success"> & {
  errorMessages?: FormMessages;
  message?: FormMessages;
  successMessages?: FormMessages;
};

export type SharedFormElementProps<T = unknown> = RequiredMarkerProp & {
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
   * Current value of the form element.
   */
  modelValue?: T;
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
};
