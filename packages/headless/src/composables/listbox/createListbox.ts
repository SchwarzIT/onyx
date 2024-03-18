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

  const handleKeydown = (event: KeyboardEvent, id: ListboxValue) => {
    if (event.key !== " ") return;
    event.preventDefault(); // prevent browser scroll when pressing space
    options.onSelect?.(id);
  };

  return {
    elements: {
      listbox: computed(() => ({
        role: "listbox",
        "aria-multiselectable": isMultiselect.value,
        "aria-label": unref(options.label),
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
            tabindex: "0",
            onKeydown: (event) => handleKeydown(event, data.id),
            onClick: () => options.onSelect?.(data.id),
          } as const;
        };
      }),
    },
    state: {},
  };
});
