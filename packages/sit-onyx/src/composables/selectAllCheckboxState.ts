import type { CheckboxGroupOption } from "src/components/OnyxCheckboxGroup/types";
import { computed, unref, type MaybeRef } from "vue";
import type { SelectionOptionValue } from "../components/OnyxRadioButton/types";
import type { OnyxCheckboxProps } from "src/components/OnyxCheckbox/types";

/**
 * Current "select all" checkbox state.
 * - checked if all options are checked
 * - indeterminate if at least one but not all options are checked
 * - unchecked if no options are checked
 */
export const useSelectAllCheckboxState = <
  TValue extends SelectionOptionValue = SelectionOptionValue,
>(
  enabledOptions: MaybeRef<CheckboxGroupOption<TValue>[]>,
  modelValue: MaybeRef<TValue[]>,
) =>
  computed<Partial<OnyxCheckboxProps>>(() => {
    const availableOptionIds = unref(enabledOptions).map(({ id }) => id);
    const currentValues = unref(modelValue).filter((i) => availableOptionIds.includes(i));

    // console.log("### I GOT TRIGGERRED", unref(enabledOptions), modelValue);

    return {
      modelValue: currentValues.length === availableOptionIds.length,
      indeterminate: availableOptionIds.length && currentValues.length ? true : undefined,
    };
  });
