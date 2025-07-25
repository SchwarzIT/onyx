import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxFABButtonProps = DensityProp &
  WithLinkProp & {
    /**
     * (Aria) Label of the action button that describes the action.
     */
    label: string;
    /**
     * If `true`, the label will be visually hidden.
     * For accessibility / screen readers, the aria-label will still be set.
     */
    hideLabel?: boolean;
    /**
     * Icon to show in the action button.
     */
    icon?: string;
    /**
     * Whether to show a skeleton button.
     */
    skeleton?: SkeletonInjected;
  };
