import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxAccordionItemProps = DensityProp & {
  /**
   * Value that is used inside the `OnyxAccordion` when the item is open.
   * Must be unique across one accordion.
   */
  value: PropertyKey;
  /**
   * Whether the accordion is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton accordion.
   */
  skeleton?: SkeletonInjected;
};
