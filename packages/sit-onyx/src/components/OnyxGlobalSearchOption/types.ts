import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OnyxButtonProps } from "../OnyxButton/types.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxGlobalSearchOptionProps = DensityProp &
  WithLinkProp<true> &
  Pick<OnyxButtonProps, "autofocus"> & {
    /**
     * Option label.
     */
    label: string;
    /**
     * Unique value of the option inside the global search.
     * Required for accessibility and keyboard support.
     */
    value: string;
    /**
     * Optional icon to show next to the label.
     */
    icon?: string;
    /**
     * Whether to show a skeleton option.
     */
    skeleton?: SkeletonInjected;
  };
