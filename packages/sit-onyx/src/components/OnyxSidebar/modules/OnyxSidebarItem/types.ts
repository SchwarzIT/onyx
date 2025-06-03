import type { DensityProp } from "../../../../composables/density";
import type { WithLinkProp } from "../../../OnyxRouterLink/types";

export type OnyxSidebarItemProps = DensityProp &
  WithLinkProp & {
    /**
     * Whether the item is currently active.
     * If "auto" and a [router](https://onyx.schwarz/development/router.html) is provided, the active state will be determined automatically based on the current route. (only when `link` property is set).
     */
    active?: boolean | "auto";
  };
