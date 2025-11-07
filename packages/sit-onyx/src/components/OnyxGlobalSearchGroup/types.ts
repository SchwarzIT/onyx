import type { DensityProp } from "../../composables/density.js";
import type { SkeletonProvidedProp } from "../../composables/useSkeletonState.js";

export type OnyxGlobalSearchGroupProps = DensityProp &
  Partial<SkeletonProvidedProp> & {
    /**
     * Group name.
     */
    label: string;
    /**
     * Whether to show skeleton options.
     */
    skeleton?: boolean | number;
  };
