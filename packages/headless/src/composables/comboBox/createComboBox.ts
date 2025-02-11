import { computed, unref, useId, type MaybeRef, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { isPrintableCharacter, wasKeyPressed, type PressedKey } from "../../utils/keyboard";
import type { Nullable } from "../../utils/types";
import { useOutsideClick } from "../helpers/useOutsideClick";
import { useTypeAhead } from "../helpers/useTypeAhead";
import {
  createListbox,
  type CreateListboxOptions,
  type ListboxValue,
} from "../listbox/createListbox";

/** See https://w3c.github.io/aria/#aria-autocomplete */
export type ComboboxAutoComplete = "none" | "list" | "both";

export const OPENING_KEYS: PressedKey[] = ["ArrowDown", "ArrowUp", " ", "Enter", "Home", "End"];
export const CLOSING_KEYS: PressedKey[] = [
  "Escape",
  { key: "ArrowUp", altKey: true },
  "Enter",
  "Tab",
];

const SELECTING_KEYS: PressedKey[] = ["Enter"];

/**
 * if the a search input is included, space should not be used to select
 * TODO: idea for the future: move this distinction to the listbox?
 */
const isSelectingKey = (event: KeyboardEvent, withSpace?: boolean) => {
  const selectingKeys = withSpace ? [...SELECTING_KEYS, " "] : SELECTING_KEYS;
  return isKeyOfGroup(event, selectingKeys);
};

const isKeyOfGroup = (event: KeyboardEvent, group: PressedKey[]) =>
  group.some((key) => wasKeyPressed(event, key));

export type CreateComboboxOptions<
  TValue extends ListboxValue,
  TAutoComplete extends ComboboxAutoComplete,
  TMultiple extends boolean = false,
> = {
  autocomplete: MaybeRef<TAutoComplete>;
  label: MaybeRef<string>;
  /**
   * Labels the listbox which displays the available options. E.g. the list label could be "Countries" for a combobox which is labelled "Country".
   */
  listLabel: MaybeRef<string>;
  /**
   * Provides additional description for the listbox which displays the available options.
   */
  listDescription?: MaybeRef<Nullable<string>>;
  /**
   * Controls the opened/visible state of the associated pop-up. When expanded the activeOption can be controlled via the keyboard.
   */
  isExpanded: MaybeRef<boolean>;
  /**
   * If expanded, the active option is the currently highlighted option of the controlled listbox.
   */
  activeOption: Ref<Nullable<TValue>>;
  /**
   * Template ref to the component root (required to close combobox on outside click).
   */
  templateRef: Ref<Nullable<HTMLElement>>;
  /**
   * Hook when the popover should toggle.
   *
   * @param preventFocus If `true`, the parent combobox should not be focused (e.g. on outside click).
   */
  onToggle?: (preventFocus?: boolean) => void;
  /**
   * Hook when an option is (un-)selected.
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
    | "onActivateFirst"
    | "onActivateLast"
    | "onActivateNext"
    | "onActivatePrevious"
    | "onSelect"
    | "multiple"
  >;

export const createComboBox = createBuilder(
  <
    TValue extends ListboxValue,
    TAutoComplete extends ComboboxAutoComplete,
    TMultiple extends boolean = false,
  >({
    autocomplete: autocompleteRef,
    onAutocomplete,
    onTypeAhead,
    multiple: multipleRef,
    label,
    listLabel,
    listDescription,
    isExpanded: isExpandedRef,
    activeOption,
    onToggle,
    onSelect,
    onActivateFirst,
    onActivateLast,
    onActivateNext,
    onActivatePrevious,
    templateRef,
  }: CreateComboboxOptions<TValue, TAutoComplete, TMultiple>) => {
    const controlsId = useId();

    const autocomplete = computed(() => unref(autocompleteRef));
    const isExpanded = computed(() => unref(isExpandedRef));
    const multiple = computed(() => unref(multipleRef));

    const handleInput = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;

      if (autocomplete.value !== "none") {
        onAutocomplete?.(inputElement.value);
      }
    };

    const typeAhead = useTypeAhead((inputString) => onTypeAhead?.(inputString));

    const handleSelect = (value: TValue) => {
      onSelect?.(value);
      if (!unref(multiple)) {
        onToggle?.();
      }
    };

    const handleNavigation = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          if (activeOption.value == undefined) {
            return onActivateLast?.();
          }
          onActivatePrevious?.(activeOption.value);
          break;
        case "ArrowDown":
          event.preventDefault();
          if (activeOption.value == undefined) {
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

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // prevent submitting on pressing enter when the combo box is used inside a <form>
        event.preventDefault();
      }

      if (!isExpanded.value && isKeyOfGroup(event, OPENING_KEYS)) {
        onToggle?.();
        if (event.key === " ") {
          event.preventDefault();
        }
        if (event.key === "End") {
          return onActivateLast?.();
        }
        return onActivateFirst?.();
      }
      if (isSelectingKey(event, autocomplete.value === "none")) {
        return handleSelect(activeOption.value!);
      }
      if (isExpanded.value && isKeyOfGroup(event, CLOSING_KEYS)) {
        return onToggle?.();
      }
      if (autocomplete.value === "none" && isPrintableCharacter(event.key)) {
        !isExpanded.value && onToggle?.();
        return typeAhead(event);
      }
      if (autocomplete.value !== "none" && isPrintableCharacter(event.key)) {
        !isExpanded.value && onToggle?.();
        return;
      }
      return handleNavigation(event);
    };

    const autocompleteInput = computed(() => {
      if (autocomplete.value === "none") return null;
      return {
        "aria-autocomplete": autocomplete.value,
        type: "text",
      };
    });

    const {
      elements: { option, group, listbox },
      internals: { getOptionId },
    } = createListbox({
      label: listLabel,
      description: listDescription,
      multiple,
      controlled: true,
      activeOption,
      isExpanded,
      onSelect: handleSelect,
    });

    useOutsideClick({
      inside: templateRef,
      onOutsideClick() {
        if (!isExpanded.value) return;
        onToggle?.(true);
      },
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
          // preventDefault to not lose focus of the combobox
          onMousedown: (e) => e.preventDefault(),
        })),
        /**
         * An input that controls another element, that can dynamically pop-up to help the user set the value of the input.
         * The input MAY be either a single-line text field that supports editing and typing or an element that only displays the current value of the combobox.
         */
        input: computed(() => ({
          role: "combobox",
          "aria-expanded": isExpanded.value,
          "aria-controls": controlsId,
          "aria-label": unref(label),
          "aria-activedescendant":
            activeOption.value != undefined ? getOptionId(activeOption.value) : undefined,
          onInput: handleInput,
          onKeydown: handleKeydown,
          ...autocompleteInput.value,
        })),
        /**
         * An optional button to control the visibility of the popup.
         */
        button: computed(() => ({
          tabindex: "-1",
          onClick: () => onToggle?.(),
        })),
      },
    };
  },
);
