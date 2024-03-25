import type { RequiredMarkerProp } from "../../composables/required";

export const MULTISELECT_TEXT_MODE = ["summary", "preview"] as const;
export type MultiselectTextMode = (typeof MULTISELECT_TEXT_MODE)[number];

export type OnyxSelectProps<TValue extends string | string[]> = RequiredMarkerProp & {
  /**
   * Current value of the select.
   * TODO: change the type after the flyout gets added and the select becomes a real interactive component!
   */
  modelValue?: TValue;
  /**
   * Label to show above the select. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
   */
  label: string;
  /**
   * If `true`, the label will be visually hidden and the `title` attribute will be set.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
  /**
   * Whether the select should be disabled.
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton select.
   */
  skeleton?: boolean;
  /**
   * Shows a loading indicator.
   */
  loading?: boolean;
  /**
   * Placeholder to show when the value is empty.
   */
  placeholder?: string;
  /**
   * Placeholder to show when the value is empty.
   */
  multiselect?: boolean;
  /**
   * How the multi select value will be displayed in the input.
   * - summary: will show "x Selected" if more than 1 is selected.
   * - preview: will show the names of the selection as a truncated list.
   *            A number-badge appears next to it including a tooltip with all selected names.
   */
  multiselectTextMode?: MultiselectTextMode;
  /**
   * Message / help text to display below the select input.
   */
  message?: string;
};
