import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxTableOfContentsProps = DensityProp & {
  /**
   * Whether to show skeleton items.
   */
  skeleton?: SkeletonInjected;
};
