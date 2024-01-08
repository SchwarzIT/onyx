import { computed, ref, type Ref } from "vue";
import { createId } from "../../utils/id";
import { createBuilder, computeIterated } from "../../utils/builder";

export const createComboBox = createBuilder(
  ({
    isExpanded,
    activeKey,
    onToggle,
    onSelect,
    onFirst,
    onLast,
    onNext,
    onPrevious,
  }: {
    isExpanded: Ref<boolean>;
    activeKey: Ref<string | undefined>;
    onToggle: () => void;
    onSelect: (key: string) => void;
    onFirst: () => void;
    onLast: () => void;
    onNext: () => void;
    onPrevious: () => void;
  }) => {
    const inputValue = ref("");
    const inputValid = ref(true);
    const controlsId = createId("comboBox-control");
    const labelId = createId("comboBox-label");

    const descendantKeyIdMap: Record<string, string | undefined> = {};

    const getOptionId = (key: string) =>
      descendantKeyIdMap[key] ?? (descendantKeyIdMap[key] = createId("comboBox-option"));

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
          onToggle();
          break;
        case "ArrowUp":
          if (!activeKey.value) {
            return onLast();
          }
          onPrevious();
          break;
        case "ArrowDown":
          if (!activeKey.value) {
            return onFirst();
          }
          onNext();
          break;
        case "Home":
          onFirst();
          break;
        case "End":
          onLast();
          break;
        default:
          break;
      }
    };

    return {
      elements: {
        label: {
          id: labelId,
        },
        listBox: computed(() => ({
          role: "listbox",
          id: controlsId,
        })),
        option: computeIterated<{ key: string; label: string; disabled: boolean }>(
          ({ key, label, disabled }) => ({
            role: "option",
            id: getOptionId(key),
            "aria-selected": activeKey.value === key,
            "aria-label": label,
            "aria-disabled": disabled,
            onClick: () => onSelect(key),
          }),
        ),
        /** this is an input */
        input: computed(() => ({
          role: "combobox",
          "aria-expanded": isExpanded.value,
          "aria-controls": controlsId,
          "aria-labelledby": labelId,
          "aria-activedescendant": activeKey.value ? getOptionId(activeKey.value) : undefined,
          onInput: handleInput,
          onKeydown: handleKeydown,
          onBlur: handleBlur,
        })),
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
