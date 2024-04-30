import { computed, ref, type MaybeRef, type Ref, unref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";
import { createListbox, type CreateListboxOptions } from "../listbox/createListbox";
import { useTypeAhead } from "../typeAhead";
import { isPrintableCharacter } from "../../utils/keyEvent";
import { isSubsetMatching } from "../../utils/object";

export type ComboboxAutoComplete = "none" | "list" | "both";

const OPENING_KEYS: string[] = ["ArrowDown", "ArrowUp", "Space", "Enter", "Home", "End"];
const SELECTING_KEYS: Partial<KeyboardEvent>[] = [
  { key: "Enter" },
  { key: " " },
  { key: "Tab" },
  { key: "ArrowUp", altKey: true },
];
const isSelectingKey = (event: KeyboardEvent) =>
  SELECTING_KEYS.some((key) =>
    isSubsetMatching(
      { altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...key },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      event as any,
    ),
  );

export type CreateComboboxOptions<
  TValue extends string,
  TAutoComplete extends ComboboxAutoComplete,
  TMultiple extends boolean = false,
> = {
  autocomplete: TAutoComplete;
  label: MaybeRef<string>;
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
  isExpanded: MaybeRef<boolean>;
  /**
   * If expanded, the active option is the currently highlighted option of the controlled listbox.
   */
  activeOption: Ref<TValue | undefined>;
  /**
   * Hook when the popover should toggle.
   */
  onToggle?: () => void;
  /**
   * Hook when an option is selected.
   */
  onSelect?: (value: TValue) => void;
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
  onActivateNext?: (currentValue: TValue) => void;
  /**
   * Hook when the previous option should be activated.
   */
  onActivatePrevious?: (currentValue: TValue) => void;
} & (TAutoComplete extends Exclude<ComboboxAutoComplete, "none">
  ? { onAutocomplete: (input: string) => void }
  : { onAutocomplete?: undefined }) &
  (TAutoComplete extends "none"
    ? { onTypeAhead: (input: string) => void }
    : { onTypeAhead?: undefined }) &
  Pick<
    CreateListboxOptions<TValue, TMultiple>,
    "onActivateFirst" | "onActivateLast" | "onActivateNext" | "onActivatePrevious" | "onSelect"
  >;

// TODO: https://w3c.github.io/aria/#aria-autocomplete
// TODO: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// TODO: button as optional

export const createComboBox = createBuilder(
  <
    TValue extends string,
    TAutoComplete extends ComboboxAutoComplete,
    TMultiple extends boolean = false,
  >({
    autocomplete,
    onAutocomplete,
    onTypeAhead,
    label,
    listLabel,
    isExpanded,
    activeOption,
    onToggle,
    onSelect,
    onActivateFirst,
    onActivateLast,
    onActivateNext,
    onActivatePrevious,
  }: CreateComboboxOptions<TValue, TAutoComplete, TMultiple>) => {
    const inputValid = ref(true);
    const inputValue = ref("");
    const controlsId = createId("comboBox-control");

    const handleInput = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      inputValue.value = inputElement.value as TValue;
      inputValid.value = inputElement.validity.valid;
      if (autocomplete !== "none") {
        onAutocomplete?.(inputValue.value);
      }
      if (!unref(isExpanded)) {
        onToggle?.();
      }
    };

    const typeAhead = useTypeAhead((inputString) => onTypeAhead?.(inputString));

    const handleSelect = (value: TValue) => {
      onSelect?.(value);
      onToggle?.();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const _isExpanded = unref(isExpanded);
      if (_isExpanded) {
        if (isSelectingKey(event)) {
          handleSelect(activeOption.value!);
          return;
        }

        switch (event.key) {
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
      } else if (OPENING_KEYS.includes(event.key)) {
        onToggle?.();
        switch (event.key) {
          case "ArrowUp":
          case "Home":
            return onActivateFirst?.();
          case "End":
            return onActivateLast?.();
        }
      }
      if (autocomplete === "none" && isPrintableCharacter(event.key)) {
        !_isExpanded && onToggle?.();
        return typeAhead(event);
      }
    };

    const autocompleteInput =
      autocomplete !== "none"
        ? {
            "aria-autocomplete": autocomplete,
            type: "text",
          }
        : null;

    const {
      elements: { option, group, listbox },
      internals: { getOptionId },
    } = createListbox({
      label: listLabel,
      controlled: true,
      activeOption,
      selectedOption: activeOption,
      onSelect: handleSelect,
    });

    return {
      elements: {
        option,
        group,
        /**
         * The listbox associated with the combobox.
         */
        listbox: computed(() => ({
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
          "aria-expanded": unref(isExpanded),
          "aria-controls": controlsId,
          "aria-label": unref(label),
          "aria-activedescendant": activeOption.value ? getOptionId(activeOption.value) : undefined,
          onInput: handleInput,
          onKeydown: handleKeydown,
          ...autocompleteInput,
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
