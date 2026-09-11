import type { InjectionKey } from "vue";
import type { DensityProp } from "../../composables/density.js";

export type OnyxTreeViewProps = DensityProp & {
  /**
   * Label of the tree view, required for accessibility / screen readers.
   */
  label: string;
};

export const TREE_VIEW_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * The current level of nesting inside the tree view.
   */
  level: number;
}>;
