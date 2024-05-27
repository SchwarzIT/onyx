import type { DensityProp } from "../composables/density";
import type { TruncationType } from "./fonts";

// IMPORTANT: When changing this type, make sure to implement the feature
// for the following components:
// - Checkbox / Checkbox group
// - Radio button / Radio button group
// - Select
// - ...

/**
 * Base select option that is e.g. used inside the select, radio button / checkbox group.
 */
export type BaseSelectOption<TValue extends SelectOptionValue = SelectOptionValue> = DensityProp & {
  /**
   * Value of the option when it is selected.
   * Must be unique in the current list of options.
   */
  value: TValue;
  /**
   * Label to show. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
   */
  label: string;
  /**
   * If `true`, the label will be visually hidden and the `title` attribute will be set.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
  /**
   * Whether to disable the component and prevent user interaction.
   */
  disabled?: boolean;
  /**
   * Shows a loading indicator.
   */
  loading?: boolean;
  /**
   * Whether to show a skeleton.
   */
  skeleton?: boolean;
  /**
   * How to truncate the label if it exceeds the max width.
   */
  truncation?: TruncationType;
};

export type SelectOptionValue = string | number | boolean;
