import type { RequiredMarkerProp } from "../../composables/required";
import type { TruncationType } from "../../types/fonts";

export type OnyxCheckboxProps = RequiredMarkerProp & {
  /**
   * Whether the checkbox is checked.
   */
  modelValue?: boolean;
  /**
   * Label to show. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
   */
  label: string;
  /**
   * If `true`, an indeterminate indicator is shown.
   */
  indeterminate?: boolean;
  /**
   * Whether to disable the checkbox and prevent user interaction.
   */
  disabled?: boolean;
  /**
   * Shows a loading indicator.
   */
  loading?: boolean;
  /**
   * If `true`, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
  /**
   * How to truncate the label if it exceeds the max width.
   */
  truncation?: TruncationType;
  /**
   * Whether to show a skeleton button.
   */
  skeleton?: boolean;
};
