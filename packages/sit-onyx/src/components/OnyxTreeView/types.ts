import type { DensityProp } from "../../composables/density.js";

export const TREE_DEPTH_INJECTION_KEY = Symbol();

export type OnyxTreeViewProps = DensityProp & {
  /**
   * Aria label for the TreeView.
   */
  label: string;
};
