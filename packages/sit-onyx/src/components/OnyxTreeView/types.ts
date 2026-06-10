import type { InjectionKey } from "vue";
import type { DensityProp } from "../../composables/density.js";

export type OnyxTreeViewProps = DensityProp & {
  /**
   * Aria label for the TreeView.
   */
  label: string;
};

export const TREE_VIEW_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * The current level of nesting inside the tree view.
   */
  level: number;
}>;
