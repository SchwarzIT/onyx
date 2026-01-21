import type { DensityProp } from "../../composables/density.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxTableOfContentsItemProps = DensityProp &
  Required<WithLinkProp> & {
    /**
     * Whether the item is currently active.
     * For "auto", the active state will be determined automatically based on the current route.
     */
    active?: boolean | "auto";
  };
