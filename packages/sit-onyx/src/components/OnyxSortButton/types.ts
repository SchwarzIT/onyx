export type OnyxSortButtonProps<T extends string = string> = {
  /**
   * Data property name that should be sorted with this sort button.
   * Allows easy combined usage of multiple sort buttons.
   */
  property: T;
  /**
   * Current sorting.
   */
  modelValue?: SortValue<T>;
};

export const SORT_ORDER = ["asc", "desc"] as const;
export type SortOrder = (typeof SORT_ORDER)[number];

export type SortValue<T extends string = string> = {
  property: T;
  order: SortOrder;
};
