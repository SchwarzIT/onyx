import type { DensityProp } from "../../composables/density.js";
import type { OnyxListItemProps } from "../OnyxListItem/types.js";

export type OnyxTreeViewItemProps = DensityProp &
  Pick<OnyxListItemProps, "active" | "disabled"> & {
    /**
     *  Label to show.
     */
    label?: string;
    /**
     * Optional icon to show.
     */
    icon?: string;
    /**
     * Weather it's open
     */
    open?: boolean;
  };
