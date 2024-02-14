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
  // TODO: JSDocs -> document which wins in collisions (e.g. isDisabled as well as isReadonly is true)
  isDisabled?: boolean;
  isReadonly?: boolean;
  isLoading?: boolean;
};

export type SelectionProps<T> = SelectionOption<T> & { selected?: boolean };
