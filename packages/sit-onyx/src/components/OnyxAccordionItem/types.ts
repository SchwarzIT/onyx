import type { DensityProp } from "../../composables/density";
import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxAccordionItemProps = DensityProp & {
  /**
   * Whether the accordion is open
   */
  open?: boolean;
  /**
   * Whether the accordion is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton accordion.
   */
  skeleton?: SkeletonInjected;
};
