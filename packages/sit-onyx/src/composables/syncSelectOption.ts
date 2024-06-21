import type { SelectOption } from "src/components/OnyxSelect/types";
import type { SelectOptionValue } from "src/types";
import { ref, watchEffect, type Ref } from "vue";

/**
 * TODO: write docs
 */
export const useSyncSelectOption = <TValue extends SelectOptionValue>(
  selection: Ref<TValue | undefined>,
  options: SelectOption<TValue>[],
) => {
  const getInitialValue = () => {
    if (!selection || !selection.value) return;
    const selectedOption = options.find((option) => option.value === selection.value);
    if (selectedOption) return selectedOption;
    return { value: selection?.value, label: "" };
  };

  const modelValue = ref<SelectOption<TValue> | undefined>();

  const vSyncSelection = {
    mounted: () => {
      modelValue.value = getInitialValue();

      watchEffect(() => {
        selection.value = modelValue.value?.value;
      });
    },
  };

  return {
    modelValue,
    vSyncSelection,
  };
};
