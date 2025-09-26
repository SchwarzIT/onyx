import { ref, toValue, watch, type Directive, type MaybeRefOrGetter } from "vue";
import { areObjectsFlatEqual } from "../utils/objects.js";
import { transformValidityStateToObject } from "../utils/validity.js";

export type UseFormValidityOptions<
  TProps extends Record<string, MaybeRefOrGetter<unknown>> = Record<
    string,
    MaybeRefOrGetter<unknown>
  >,
> = {
  /**
   * Explicitly set custom error. Any non-nullish value will set the input to be invalid.
   */
  error?: MaybeRefOrGetter<string | undefined>;
  /**
   * Props that influence native validation state. These are not used directly, but watched to trigger a re-evaluation of validation state.
   * E.g. when `required` is changed from `true` to `false` the state needs to be re-evaluated.
   */
  props: TProps;
  /**
   * Component emit as defined with `const emit = defineEmits()`
   */
  emit: (evt: "validityChange", validity: ValidityState) => void;
};

export type InputValidationElement = Pick<HTMLInputElement, "validity" | "setCustomValidity">;

export const useCustomValidity = <TProps extends Record<string, MaybeRefOrGetter<unknown>>>(
  options: Omit<UseFormValidityOptions<TProps>, "emit">,
) => {
  const validityState = ref<Record<keyof ValidityState, boolean>>();

  const vCustomValidity = {
    mounted: (el) => {
      watch(
        // we need to watch all props instead of only modelValue so the validity is re-checked
        // when the validation rules change
        [() => toValue(options.error), () => toValue(options.props)],
        () => {
          el.setCustomValidity(toValue(options.error) ?? "");
          const newValidityState = transformValidityStateToObject(el.validity);

          // do not emit update if input is valid and has never been invalid
          if (!validityState.value && newValidityState.valid) return;

          // ignore if actual validity state value is unchanged
          if (validityState.value && areObjectsFlatEqual(newValidityState, validityState.value)) {
            return;
          }

          validityState.value = newValidityState;
        },
        // We use "post" flush timing, to ensure the DOM is up-to-date and the elements validity state is in sync.
        { immediate: true, deep: true, flush: "post" },
      );
    },
  } satisfies Directive<InputValidationElement, undefined>;

  return {
    /**
     * Directive to set the custom error message and emit validityChange event.
     */
    vCustomValidity,
    /**
     * validityState of the html element.
     */
    validityState,
  };
};
