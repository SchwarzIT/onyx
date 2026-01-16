import type { DensityProp } from "../../composables/density.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxTableOfContentsItemProps = DensityProp &
  Required<WithLinkProp> & {
    /**
     * Label to display.
     */
    label: string;
    /**
     * Which headline level the item is representing in the content (h1-h6).
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Whether the item is currently active.
     * For "auto", the active state will be determined automatically based on the current route.
     */
    active?: boolean | "auto";
  };
