import type { FormErrorMessages } from "../../composables/useCustomValidity";
import type { RequiredMarkerProp } from "../../composables/required";

export type OnyxFormElementProps = RequiredMarkerProp & {
  /**
   * Current value of the form element.
   */
  modelValue?: unknown;
  /**
   * Label to show above the form element. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
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
   * Maximum number of characters that are allowed to be entered.
   * Warning: when the value is (pre)set programmatically,
   * the input invalidity will not be detected by the browser, it will only turn invalid
   * as soon as a user interacts with the input (types something).
   */
  maxlength?: number;
  /**
   * If `true`, a character counter will be displayed if `maxLength` is set.
   */
  withCounter?: boolean;
};
