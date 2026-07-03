import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxTableOfContentsItemProps = DensityProp &
  Required<WithLinkProp> & {
    /**
     * Whether the item is currently active.
     * For "auto", the active state will be determined automatically based on the current route
     * or when the corresponding OnyxHeadline becomes visible (requires to OnyxPageLayout to be used).
     */
    active?: boolean | "auto";
    /**
     * Whether to show a skeleton item.
     */
    skeleton?: SkeletonInjected;
  };
