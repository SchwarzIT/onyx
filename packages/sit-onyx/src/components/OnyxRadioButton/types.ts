/**
 * TODO: move to dedicated file
 */
export type SelectionOption<T> = {
  /**
   * id of the selection option, not of the radio button input
   */
  id: string;
  label: string;
  /**
   * An optional value.
   * It's not actually used by the selection controls, but can be used to associate data with this option.
   */
  value?: T;
  disabled?: boolean;
};

export type SelectionProps<T> = SelectionOption<T> & { selected?: boolean };

export type RadioButtonProps<TValue> = SelectionProps<TValue> & {
  /**
   * Identifier for the radio buttons in the group.
   * All radio buttons that should belong to the same radio group must have the same name.
   * See also: https://html.spec.whatwg.org/multipage/input.html#radio-button-group
   */
  name: string;
  required?: boolean;
  errorMessage?: string;
};
