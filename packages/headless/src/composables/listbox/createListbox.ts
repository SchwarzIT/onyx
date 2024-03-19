import { computed, unref, type MaybeRef } from "vue";
import { createBuilder } from "../../utils/builder";

export type CreateListboxOptions = {
  /**
   * Aria label for the listbox.
   */
  label: MaybeRef<string>;
  /**
   * Whether the listbox is multiselect.
   */
  multiselect?: MaybeRef<boolean | undefined>;
  /**
   * Hook when an option is selected.
   */
  onSelect?: (id: ListboxValue) => void;
};

export type ListboxValue = string | number | boolean;

export const createListbox = createBuilder((options: CreateListboxOptions) => {
  const isMultiselect = computed(() => unref(options.multiselect) ?? false);

  return {
    elements: {
      listbox: computed(() => ({
        role: "listbox",
        "aria-multiselectable": isMultiselect.value,
        "aria-label": unref(options.label),
        tabindex: "0",
      })),
      group: computed(() => {
        return (options: { label: string }) => ({
          role: "group",
          "aria-label": options.label,
        });
      }),
      option: computed(() => {
        return (data: {
          label: string;
          id: ListboxValue;
          selected?: boolean;
          disabled?: boolean;
        }) => {
          const isSelected = data.selected ?? false;
          return {
            role: "option",
            "aria-label": data.label,
            "aria-checked": isMultiselect.value ? isSelected : undefined,
            "aria-selected": !isMultiselect.value ? isSelected : undefined,
            "aria-disabled": data.disabled,
            onClick: () => options.onSelect?.(data.id),
          } as const;
        };
      }),
    },
    state: {},
  };
});
