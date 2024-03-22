import { computed, ref, unref, watchEffect, type MaybeRef, type Ref } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";

export type CreateListboxOptions = {
  /**
   * Aria label for the listbox.
   */
  label: MaybeRef<string>;
  /**
   * Value of currently selected option.
   */
  selectedOption: Ref<ListboxValue | undefined>;
  /**
   * Value of currently (visually) active option.
   */
  activeOption: Ref<ListboxValue | undefined>;
  /**
   * Whether the listbox is multiselect.
   */
  multiselect?: MaybeRef<boolean | undefined>;
  /**
   * Hook when an option is selected.
   */
  onSelect?: (value: ListboxValue) => void;
  /**
   * Hook when the first option should be activated.
   */
  onActivateFirst?: () => void;
  /**
   * Hook when the last option should be activated.
   */
  onActivateLast?: () => void;
  /**
   * Hook when the next option should be activated.
   */
  onActivateNext?: (currentValue: ListboxValue) => void;
  /**
   * Hook when the previous option should be activated.
   */
  onActivatePrevious?: (currentValue: ListboxValue) => void;
  /**
   * Hook when the first option starting with the given label should be activated.
   */
  onTypeAhead?: (label: string) => void;
};

export type ListboxValue = string | number | boolean;

/**
 * Composable for creating a accessibility-conform listbox.
 * For supported keyboard shortcuts, see: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/
 */
export const createListbox = createBuilder((options: CreateListboxOptions) => {
  const isMultiselect = computed(() => unref(options.multiselect) ?? false);

  /**
   * Map for option IDs. key = option value, key = ID for the HTML element
   */
  const descendantKeyIdMap = new Map<ListboxValue, string>();

  const getOptionId = (value: ListboxValue) => {
    if (!descendantKeyIdMap.has(value)) {
      descendantKeyIdMap.set(value, createId("listbox-option"));
    }
    return descendantKeyIdMap.get(value)!;
  };

  /**
   * Whether the listbox element is focused.
   */
  const isFocused = ref(false);

  // scroll currently active option into view if needed
  watchEffect(() => {
    if (options.activeOption.value == undefined || !isFocused.value) return;
    const id = getOptionId(options.activeOption.value);
    document.getElementById(id)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  });

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case " ":
        event.preventDefault();
        if (options.activeOption.value != undefined) {
          options.onSelect?.(options.activeOption.value);
        }
        break;

      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        // if no option is active yet, activate the first option
        if (options.activeOption.value == undefined) {
          options.onActivateFirst?.();
          return;
        }

        if (event.key === "ArrowDown") {
          options.onActivateNext?.(options.activeOption.value);
        } else {
          options.onActivatePrevious?.(options.activeOption.value);
        }
        break;

      case "Home":
        event.preventDefault();
        options.onActivateFirst?.();
        break;

      case "End":
        event.preventDefault();
        options.onActivateLast?.();
        break;

      default:
        // if a printable character is pressed, the first option/text starting with the pressed
        // character should be active
        options.onTypeAhead?.(event.key);
    }
  };

  return {
    elements: {
      listbox: computed(() => {
        return {
          role: "listbox",
          "aria-multiselectable": isMultiselect.value,
          "aria-label": unref(options.label),
          tabindex: "0",
          "aria-activedescendant":
            options.activeOption.value != undefined
              ? getOptionId(options.activeOption.value)
              : undefined,
          onFocus: () => (isFocused.value = true),
          onBlur: () => (isFocused.value = false),
          onKeydown: handleKeydown,
        };
      }),
      group: computed(() => {
        return (options: { label: string }) => ({
          role: "group",
          "aria-label": options.label,
        });
      }),
      option: computed(() => {
        return (data: {
          label: string;
          value: ListboxValue;
          selected?: boolean;
          disabled?: boolean;
        }) => {
          const isSelected = data.selected ?? false;
          return {
            id: getOptionId(data.value),
            role: "option",
            "aria-label": data.label,
            "aria-checked": isMultiselect.value ? isSelected : undefined,
            "aria-selected": !isMultiselect.value ? isSelected : undefined,
            "aria-disabled": data.disabled,
            onClick: () => options.onSelect?.(data.value),
          } as const;
        };
      }),
    },
    state: {
      isFocused,
    },
  };
});
