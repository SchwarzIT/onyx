import { computed, ref, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";
import { createListbox, type ListboxValue } from "../listbox/createListbox";

// TODO: https://w3c.github.io/aria/#aria-autocomplete
// TODO: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// TODO: button as optional

export const createComboBox = createBuilder(
  <TValue extends ListboxValue>({
    isExpanded,
    activeKey,
    onToggle,
    onSelect,
    onActivateFirst,
    onActivateLast,
    onActivateNext,
    onActivatePrevious,
  }: {
    isExpanded: Ref<boolean>;
    activeKey: Ref<TValue | undefined>;
    onToggle: () => void;
    onSelect: (key: TValue) => void;
    onActivateFirst: () => void;
    onActivateLast: () => void;
    onActivateNext: () => void;
    onActivatePrevious: () => void;
  }) => {
    const inputValue = ref("");
    const inputValid = ref(true);
    const controlsId = createId("comboBox-control");
    const labelId = createId("comboBox-label");

    const handleInput = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      inputValue.value = inputElement.value;
      inputValid.value = inputElement.validity.valid;
    };

    const handleBlur = () => {
      if (isExpanded.value) {
        onToggle();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!isExpanded.value) {
        return;
      }
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onToggle();
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!activeKey.value) {
            return onActivateLast();
          }
          onActivatePrevious();
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!activeKey.value) {
            return onActivateFirst();
          }
          onActivateNext();
          break;
        case "Home":
          event.preventDefault();
          onActivateFirst();
          break;
        case "End":
          event.preventDefault();
          onActivateLast();
          break;
      }
    };

    const {
      elements: { option, group, listbox, label },
      internals: { getOptionId },
    } = createListbox({
      controlled: true,
      activeOption: activeKey,
      selectedOption: activeKey,
      onSelect,
    });

    return {
      elements: {
        label,
        option,
        group,
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
          "aria-activedescendant": activeKey.value ? getOptionId(activeKey.value) : undefined,
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
      state: {
        inputValue,
      },
    };
  },
);
