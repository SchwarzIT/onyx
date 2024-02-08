export type SelectionOption<T> = {
  id: string;
  label: string;
  value: T;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isLoading?: boolean;
};

export type SelectionProps<T> = SelectionOption<T> & { selected?: boolean };
