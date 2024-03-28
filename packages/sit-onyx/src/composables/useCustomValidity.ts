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
  /**
   * Template ref to the `<input>` element
   */
  inputRef: Ref<HTMLInputElement | undefined>;
  /**
   * Component props as defined with `const props = defineProps()`
   */
  props: CustomValidityProp & { modelValue?: unknown };
  /**
   * Component emit as defined with `const emit = defineEmits()`
   */
  emit: (evt: "validityChange", validity: ValidityState) => void;
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
