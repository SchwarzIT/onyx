/**
 * TODO: move to dedicated file
 */
export type SelectionOption<T> = {
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
  name: string;
  required?: boolean;
  errorMessage?: string;
};
