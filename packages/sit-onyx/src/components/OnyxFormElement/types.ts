import type { FormErrorMessages } from "../../composables/useCustomValidity";
import type { RequiredMarkerProp } from "../../composables/required";

export type OnyxFormElementProps = RequiredMarkerProp & {
  /**
   * Label to show above the form element. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
   */
  label: string;
  /**
   * If `true`, the label will be visually hidden and the `title` attribute will be set.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
  /**
   * Info text to show inside a tooltip, next to the label.
   * The tooltip will be hidden if `hideLabel` property is set to true.
   */
  labelTooltip?: string;
  /**
   * Message / help text to display below the form element.
   * Will be replaced by an error message if the form element is invalid.
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
