import type { ListboxValue, ListboxModelValue } from "@sit-onyx/headless";

export type OnyxListboxProps<
  TMultiple extends boolean | undefined,
  TOption extends ListboxValue = ListboxValue,
> = {
  /**
   * Aria label. Must be set for accessibility reasons.
   */
  label: string;
  /**
   * Available options to choose from.
   */
  options: ListboxOption<TOption>[];
  /**
   * Message / help text to display at the bottom.
   */
  message?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: ListboxModelValue<TOption, TMultiple>;
  /**
   * Allows the selection of multiple listbox options
   */
  multiple?: TMultiple;
};

export type ListboxOption<T extends ListboxValue = ListboxValue> = {
  /**
   * Option ID / value to use when the option is selected.
   */
  id: T;
  /**
   * Label to show.
   */
  label: string;
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
};
