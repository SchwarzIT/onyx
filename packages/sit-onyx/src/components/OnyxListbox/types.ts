import type { SelectOption, SelectOptionValue } from "../../types";

export type OnyxListboxProps<TValue extends SelectOptionValue = SelectOptionValue> = {
  /**
   * Aria label. Must be set for accessibility reasons.
   */
  label: string;
  /**
   * Available options to choose from.
   */
  options: SelectOption<TValue>[];
  /**
   * Message / help text to display at the bottom.
   */
  message?: string;
  /**
   * Current value / selected option(s).
   */
  modelValue?: TValue;
};
