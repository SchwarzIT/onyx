import { computed, unref, type MaybeRef } from "vue";
import { createBuilder } from "../../utils/builder";

export const createListbox = createBuilder(
  (options: { multiselect?: MaybeRef<boolean | undefined>; onSelect?: (id: string) => void }) => {
    const isMultiselect = computed(() => unref(options.multiselect) ?? false);

    const handleKeydown = (event: KeyboardEvent, id: string) => {
      if (event.key !== " ") return;
      event.preventDefault(); // prevent browser scroll when pressing space
      options.onSelect?.(id);
    };

    return {
      elements: {
        listbox: computed(() => ({
          role: "listbox",
          "aria-multiselectable": isMultiselect.value,
        })),
        group: computed(() => {
          return (options: { label: string }) => ({
            role: "group",
            "aria-label": options.label,
          });
        }),
        option: computed(() => {
          return (option: {
            label: string;
            id: string;
            selected?: boolean;
            disabled?: boolean;
          }) => {
            const isSelected = option.selected ?? false;
            return {
              role: "option",
              "aria-label": option.label,
              "aria-checked": isMultiselect.value ? isSelected : undefined,
              "aria-selected": !isMultiselect.value ? isSelected : undefined,
              "aria-disabled": option.disabled,
              tabindex: "0",
              onKeydown: (event) => handleKeydown(event, option.id),
              onClick: () => options.onSelect?.(option.id),
            } as const;
          };
        }),
      },
      state: {},
    };
  },
);
