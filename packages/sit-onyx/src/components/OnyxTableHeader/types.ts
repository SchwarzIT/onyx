import type { SortValue } from "../OnyxSortButton/types";

type SortProp =
  | {
      /**
       * Whether the header should support a sort button.
       * Will only be displayed on hover if no sort is active.
       */
      sortable: true;
      /**
       * Current sort value.
       */
      sort?: SortValue;
    }
  | { sortable?: false };

export type OnyxTableHeaderProps = SortProp;
