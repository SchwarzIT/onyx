import type { Ref } from "vue";
import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/utils.js";
import type { SegmentedControlElement } from "../OnyxSegmentedControlElement/types.js";

export type OnyxSegmentedControlProps = DensityProp & {
  /**
   * value of the active control element
   */
  modelValue: Nullable<string>;
  /**
   * Whether to show a skeleton segmented control.
   */
  skeleton?: SkeletonInjected;
};
export type SegmentedControlInject = {
  elements: Ref<SegmentedControlElement[]>;
  setActive: (el: SegmentedControlElement) => void;
  activeElement: Ref<Nullable<SegmentedControlElement>>;
  addElement: (el: SegmentedControlElement) => void;
  elementMinWidth?: Nullable<string>;
};
