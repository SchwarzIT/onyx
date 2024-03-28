import { areObjectsFlatEqual } from "@/utils/comparator";
import { transformValidityStateToObject } from "@/utils/forms";
import { ref, watch, type Ref } from "vue";

export type CustomValidityProp = {
  /**
   * Custom error message to show. Will only show up after the user has interacted with the input.
   */
  customError?: string;
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
  const validityState = ref<Record<keyof ValidityState, boolean>>();

  /**
   * Sync custom error with the native input validity.
   */
  watch(
    [options.inputRef, () => options.props.customError],
    () => {
      options.inputRef.value?.setCustomValidity(options.props.customError ?? "");
    },
    { immediate: true },
  );

  /**
   * Update validityState ref when the input changes.
   */
  watch(
    [options.inputRef, () => options.props.customError, () => options.props.modelValue],
    ([inputRef]) => {
      if (!inputRef) return;
      const newValidityState = transformValidityStateToObject(inputRef.validity);

      // do not emit validityChange event if input is valid and has never been invalid
      if (newValidityState.valid && !validityState.value) return;

      // ignore if actual validity state value is unchanged
      if (validityState.value && areObjectsFlatEqual(newValidityState, validityState.value)) {
        return;
      }

      validityState.value = newValidityState;
      options.emit("validityChange", validityState.value);
    },
    { immediate: true },
  );
};
