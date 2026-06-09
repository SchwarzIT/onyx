import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { createBuilder } from "../../utils/builder.js";

export type UseTreeViewOptions = {
  /**
   * The accessible label for the tree.
   */
  label: MaybeRefOrGetter<string>;
};

export const createTreeView = createBuilder((options: UseTreeViewOptions) => {
  return {
    elements: {
      tree: computed(() => ({
        role: "tree",
        "aria-label": toValue(options.label),
      })),
    },
  };
});
