import type { OnyxCheckboxProps } from "src/components/OnyxCheckbox/types";
import { computed, type Ref } from "vue";
import type { SelectOptionValue } from "../types";

const useSelectAllCheckboxState = <TValue extends SelectOptionValue = SelectOptionValue>(
  enabledOptionValues: Ref<TValue[]>,
  modelValue: Ref<TValue[]>,
) =>
  computed(() => {
    const currentValues = modelValue.value.filter((value) =>
      enabledOptionValues.value.includes(value),
    );
    const isActive = currentValues.length === enabledOptionValues.value.length;

    return {
      modelValue: isActive,
      indeterminate:
        !isActive && enabledOptionValues.value.length && currentValues.length ? true : undefined,
    } satisfies Partial<OnyxCheckboxProps>;
  });

export const useCheckAll = <TValue extends SelectOptionValue = SelectOptionValue>(
  enabledOptionValues: Ref<TValue[]>,
  modelValue: Ref<TValue[]>,
  onChangeCallback: (newValue: TValue[]) => void,
) => {
  return {
    /**
     * Current "select all" checkbox state.
     * - checked if all options are checked
     * - indeterminate if at least one but not all options are checked
     * - unchecked if no options are checked
     */
    state: useSelectAllCheckboxState(enabledOptionValues, modelValue),
    /**
     * Provides an update for the checkbox list with
     * - all option values if "select all" was checked
     * - an empty list if "select all" was unchecked
     */
    handleChange: (isChecked: boolean) => {
      const newValue = isChecked ? enabledOptionValues.value : [];
      onChangeCallback(newValue);
    },
  };
};
