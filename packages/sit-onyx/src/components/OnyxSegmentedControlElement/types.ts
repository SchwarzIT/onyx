import type { DensityProp } from "../../composables/density.js";

export type SegmentedControlElementProps = DensityProp & {
  value: string;
  icon?: string;
  label?: string;
  disabled?: boolean;
};
export type SegmentedControlElement = {
  value: string;
  element: HTMLElement | null;
  disabled: boolean;
};
