import type { RequiredMarkerProp } from "../../composables/required";

export const MULTISELECT_TEXT_MODE = ["summary", "preview"] as const;
export type MultiselectTextMode = (typeof MULTISELECT_TEXT_MODE)[number];

/**
 * Whether multiple values can be selected.
 */
export type Multiple =
  | boolean
  | {
      /**
       * How the multiselect value will be displayed in the input.
       * - summary (default): will show "x Selected" if more than 1 is selected.
       * - preview: will show the names of the selection as a truncated list.
       *            A number-badge appears next to it including a tooltip with all selected names.
       * Has no effect on single select mode.
       */
      textMode?: MultiselectTextMode;
    };

export type SelectModelValue<TMultiple extends Multiple> = TMultiple extends undefined | false
  ? string
  : string[];

export type OnyxSelectProps<
  TValue extends SelectModelValue<TMultiple>,
  TMultiple extends Multiple,
> = RequiredMarkerProp & {
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
   * TODO: implement skeleton
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
   * Whether multiple values can be selected.
   * TODO: We must type the component using generics so that if multiple is truthy, modelValue must be an array
   */
  multiple?: TMultiple;
  /**
   * Message / help text to display below the select input.
   */
  message?: string;
};
