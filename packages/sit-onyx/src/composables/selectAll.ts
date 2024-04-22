import type { OnyxCheckboxProps } from "src/components/OnyxCheckbox/types";
import type { CheckboxGroupOption } from "src/components/OnyxCheckboxGroup/types";
import { computed, type Ref } from "vue";
import type { SelectionOptionValue } from "../components/OnyxRadioButton/types";

/**
 * Current "select all" checkbox state.
 * - checked if all options are checked
 * - indeterminate if at least one but not all options are checked
 * - unchecked if no options are checked
 */
export const useSelectAllCheckboxState = <
  TValue extends SelectionOptionValue = SelectionOptionValue,
>(
  enabledOptions: Ref<CheckboxGroupOption<TValue>[]>,
  modelValue: Ref<TValue[]>,
) =>
  computed<Partial<OnyxCheckboxProps>>(() => {
    const availableOptionIds = enabledOptions.value.map(({ id }) => id);
    const currentValues = modelValue.value.filter((value) => availableOptionIds.includes(value));

    const isActive = currentValues.length === availableOptionIds.length;

    return {
      modelValue: isActive,
      indeterminate:
        !isActive && availableOptionIds.length && currentValues.length ? true : undefined,
    };
  });
