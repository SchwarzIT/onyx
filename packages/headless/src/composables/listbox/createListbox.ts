import { computed, unref, type MaybeRef } from "vue";
import { computeIterated, createBuilder } from "../../utils/builder";

export const createComboBox = createBuilder(
  (options: { multiselect?: MaybeRef<boolean | undefined> }) => {
    return {
      elements: {
        listbox: computed(() => ({
          role: "listbox",
          "aria-multiselectable": unref(options.multiselect) ?? false,
        })),
        group: computeIterated<{ label: string }>(({ label }) => ({
          role: "group",
          "aria-label": label,
        })),
      },
      state: {},
    };
  },
);
