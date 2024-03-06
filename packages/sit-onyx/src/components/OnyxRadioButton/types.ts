/**
 * TODO: move to dedicated file
 */
export type SelectionOption<T = unknown> = {
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
  /**
   * Whether to show a skeleton button.
   */
  skeleton?: boolean;
};

export type SelectionProps<T> = SelectionOption<T> & { selected?: boolean };

export type RadioButtonProps<TValue> = SelectionProps<TValue> & {
  /**
   * Identifier for the radio buttons in the group.
   * All radio buttons that should belong to the same radio group must have the same name.
   * See also: https://html.spec.whatwg.org/multipage/input.html#radio-button-group
   */
  name: string;
  /**
   * If any radio button of a group is required, a radio button of the group must be checked.
   * But it doesn't have to be this particular option.
   * See also: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#required
   */
  required?: boolean;
  errorMessage?: string;
};
