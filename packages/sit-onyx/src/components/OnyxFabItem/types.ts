import type { DensityProp } from "../../composables/density.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxFABItemProps = DensityProp &
  WithLinkProp & {
    /**
     * Text label to show
     */
    label: string;
    /**
     * If `true`, the label will be visually hidden.
     * For accessibility / screen readers, the aria-label will still be set.
     */
    hideLabel?: boolean;
    /**
     * Optional icon to show.
     */
    icon?: string;
  };
