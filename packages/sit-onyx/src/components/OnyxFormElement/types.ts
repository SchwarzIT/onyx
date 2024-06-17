import type { FormErrorMessages } from "../../composables/useCustomValidity";
import type { RequiredMarkerProp } from "../../composables/required";

export type OnyxFormElementProps = RequiredMarkerProp & {
  /**
   * Label to show above the form element.
   */
  label?: string;
  /**
   * Info text to show inside a tooltip, next to the label.
   * The tooltip will be hidden if `hideLabel` property is set to true.
   */
  labelTooltip?: string;
  /**
   * Message / help text to display below the input.
   * Will be replaced by an error message if the input is invalid.
   */
  message?: string;
  /**
   * Info message / additional text to display inside a tooltip next to the message.
   */
  messageTooltip?: string;
  /**
   * Error messages that inform about causes for invalidity of form components
   */
  errorMessages?: FormErrorMessages;
  /**
   * Text that will be displayed on the right of the footer
   */
  footerRightText?: string;
};
