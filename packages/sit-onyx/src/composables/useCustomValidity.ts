import { areObjectsFlatEqual } from "@/utils/comparator";
import { transformValidityStateToObject } from "@/utils/forms";
import { onMounted, ref, watch, type Ref } from "vue";

export type CustomValidityProp = {
  /**
   * Custom error message to show. Will only show up after the user has interacted with the input.
   */
  customError?: string;
};

export type CustomValidityEmit = {
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
};

export type UseCustomValidityOptions = {
  inputRef: Ref<HTMLInputElement | undefined>;
  props: CustomValidityProp & { modelValue?: unknown };
  emit: ReturnType<typeof defineEmits<CustomValidityEmit>>;
};

export const useCustomValidity = (options: UseCustomValidityOptions) => {
  const validityState = ref(options.inputRef.value?.validity);

  /**
   * Sync custom error with the native input validity.
   */
  watch(
    [options.inputRef, () => options.props.customError],
    ([inputRef, customError]) => inputRef?.setCustomValidity(customError || ""),
    { immediate: true },
  );

  onMounted(() => {
    /**
     * Update validityState ref when the input changes.
     */
    watch(
      [options.inputRef, () => options.props.customError, () => options.props.modelValue],
      ([inputRef]) => {
        if (!inputRef) return;
        const newValidityState = transformValidityStateToObject(inputRef.validity);
        //  only update + emit the validity state when it changed
        if (!validityState.value || !areObjectsFlatEqual(newValidityState, validityState.value)) {
          validityState.value = newValidityState;
          options.emit("validityChange", validityState.value);
        }
      },
    );
  });
};
