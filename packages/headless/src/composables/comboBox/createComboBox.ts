import { computed, ref, type MaybeRef, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";
import {
  createListbox,
  type CreateListboxOptions,
  type ListboxValue,
} from "../listbox/createListbox";

export type CreateComboboxOptions<
  TValue extends ListboxValue = ListboxValue,
  TMultiple extends boolean = false,
> = {
  /**
   * Labels the listbox which displays the available options. E.g. the list label could be "Countries" for a combobox which is labelled "Country".
   */
  listLabel: MaybeRef<string>;
  /**
   * The current value of the combobox. Is updated when an option from the controlled listbox is selected or by typing into it.
   */
  inputValue: Ref<TValue | undefined>;
  /**
   * Controls the opened/visible state of the associated pop-up. When expanded the activeOption can be controlled via the keyboard.
   */
  isExpanded: Ref<boolean>;
  /**
   * If expanded, the active option is the currently highlighted option of the controlled listbox.
   */
  activeOption: Ref<TValue | undefined>;
  /**
   * Hook when the popover should toggle.
   */
  onToggle?: () => void;
} & Pick<
  CreateListboxOptions<TValue, TMultiple>,
  "onActivateFirst" | "onActivateLast" | "onActivateNext" | "onActivatePrevious" | "onSelect"
>;

// TODO: https://w3c.github.io/aria/#aria-autocomplete
// TODO: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// TODO: button as optional

export const createComboBox = createBuilder(
  <TValue extends ListboxValue = ListboxValue, TMultiple extends boolean = false>({
    listLabel,
    inputValue,
    isExpanded,
    activeOption,
    onToggle,
    onSelect,
    onActivateFirst,
    onActivateLast,
    onActivateNext,
    onActivatePrevious,
  }: CreateComboboxOptions<TValue, TMultiple>) => {
    const inputValid = ref(true);
    const controlsId = createId("comboBox-control");
    const labelId = createId("comboBox-label");

    const handleInput = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      inputValue.value = inputElement.value as TValue;
      inputValid.value = inputElement.validity.valid;
    };

    const handleBlur = () => {
      if (isExpanded.value) {
        onToggle?.();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!isExpanded.value) {
        return;
      }
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (activeOption.value) {
            onSelect?.(activeOption.value);
            inputValue.value = activeOption.value;
          }
          break;
        case "Escape":
          event.preventDefault();
          onToggle?.();
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!activeOption.value) {
            return onActivateLast?.();
          }
          onActivatePrevious?.(activeOption.value);
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!activeOption.value) {
            return onActivateFirst?.();
          }
          onActivateNext?.(activeOption.value);
          break;
        case "Home":
          event.preventDefault();
          onActivateFirst?.();
          break;
        case "End":
          event.preventDefault();
          onActivateLast?.();
          break;
      }
    };

    const {
      elements: { option, group, listbox },
      internals: { getOptionId },
    } = createListbox({
      label: listLabel,
      controlled: true,
      activeOption,
      selectedOption: activeOption,
      onSelect,
    });

    return {
      elements: {
        option,
        group,
        label: {
          id: labelId,
        },
        /**
         * The listbox associated with the combobox.
         */
        listBox: computed(() => ({
          ...listbox.value,
          id: controlsId,
        })),
        /**
         * An input that controls another element, that can dynamically pop-up to help the user set the value of the input.
         * The input MAY be either a single-line text field that supports editing and typing or an element that only displays the current value of the combobox.
         */
        input: computed(() => ({
          value: inputValue.value,
          role: "combobox",
          "aria-expanded": isExpanded.value,
          "aria-controls": controlsId,
          "aria-labelledby": labelId,
          "aria-activedescendant": activeOption.value ? getOptionId(activeOption.value) : undefined,
          onInput: handleInput,
          onKeydown: handleKeydown,
          onBlur: handleBlur,
        })),
        /**
         * An optional button to control the visibility of the popup.
         */
        button: computed(() => ({
          tabindex: "-1",
          onClick: onToggle,
        })),
      },
    };
  },
);
