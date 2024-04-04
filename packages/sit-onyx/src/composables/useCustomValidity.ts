import { nextTick, ref, watch, watchEffect, type Directive } from "vue";
import { areObjectsFlatEqual } from "../utils/comparator";
import { transformValidityStateToObject } from "../utils/forms";

export type CustomValidityProp = {
  /**
   * Custom error message to show. Will only show up after the user has interacted with the input.
   */
  customError?: string;
};

export type UseCustomValidityOptions = {
  /**
   * Component props as defined with `const props = defineProps()`
   */
  props: CustomValidityProp & { modelValue?: unknown };
  /**
   * Component emit as defined with `const emit = defineEmits()`
   */
  emit: (evt: "validityChange", validity: ValidityState) => void;
};

export type InputValidationElement = Pick<HTMLInputElement, "validity" | "setCustomValidity">;

/**
 * Composable for unified handling of custom error messages for form components.
 * Will call `setCustomValidity()` accordingly and emit the "validityChange" event
 * whenever the input value / error changes.
 *
 * @example
 * ```html
 * <script lang="ts" setup>
 * const props = defineProps<CustomValidityProp>();
 * const emit = defineEmits<{ validityChange: [validity: ValidityState] }>();
 *
 * const { vCustomValidity } = useCustomValidity({ props, emit });
 * </script>
 *
 * <template>
 *  <input v-custom-validity />
 * </template>
 * ```
 */
export const useCustomValidity = (options: UseCustomValidityOptions) => {
  const validityState = ref<Record<keyof ValidityState, boolean>>();
  const isTouched = ref(false);

  /**
   * Sync isTouched state.
   */
  const stopWatch = watch(
    () => options.props.modelValue,
    () => {
      isTouched.value = true;
      nextTick(stopWatch);
    },
  );

  const vCustomValidity = {
    mounted: (el) => {
      /**
       * Sync custom error with the native input validity.
       */
      watchEffect(() => el.setCustomValidity(options.props.customError ?? ""));

      /**
       * Update validityState ref when the input changes.
       */
      watch(
        [() => options.props.customError, () => options.props.modelValue, isTouched],
        () => {
          const newValidityState = transformValidityStateToObject(el.validity);

          // do not emit validityChange event if input is valid and has never been invalid
          if (!isTouched.value || (!validityState.value && newValidityState.valid)) return;

          // ignore if actual validity state value is unchanged
          if (validityState.value && areObjectsFlatEqual(newValidityState, validityState.value)) {
            return;
          }

          validityState.value = newValidityState;
          options.emit("validityChange", validityState.value);
        },
        { immediate: true },
      );
    },
  } satisfies Directive<InputValidationElement, undefined>;

  return {
    /**
     * Directive to set the custom error message and emit validityChange event.
     */
    vCustomValidity,
  };
};
