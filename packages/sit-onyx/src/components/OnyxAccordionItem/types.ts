import type { DensityProp } from "../../composables/density";
import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxAccordionItemProps = DensityProp & {
  /**
   * Value that is used inside the `OnyxAccordion` when the item is open.
   * Must be unique across one accordion.
   */
  value: string;
  /**
   * Whether the accordion is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton accordion.
   */
  skeleton?: SkeletonInjected;
};
