import { computed, toValue, type Reactive, type Ref } from "vue";
import { useFormContext } from "../components/OnyxForm/OnyxForm.core.js";
import type { OnyxInputProps } from "../components/OnyxInput/types.js";

export type UseClearButtonOptions = {
  modelValue: Ref<unknown>;
  props: Reactive<Pick<OnyxInputProps, "hideClearIcon" | "readonly" | "disabled" | "loading">>;
};

/**
 * Composable for determining whether to show the clear button for a form element.
 */
export const useClearButton = (options: UseClearButtonOptions) => {
  const { disabled } = useFormContext(options.props);

  const showClearButton = computed(() => {
    const props = toValue(options.props);
    if (props.hideClearIcon || props.readonly || props.loading || disabled.value) {
      return false;
    }

    const value = toValue(options.modelValue);
    return isValueDefined(value);
  });

  return { showClearButton };
};

/**
 * Checks if the given value is considered defines in order to show the clear button.
 */
function isValueDefined(value: unknown): boolean {
  // any number expect NaN (including 0 should be considered defined)
  if (typeof value === "number") return true;
  if (typeof value == "boolean") return true;
  if (Array.isArray(value)) return value.length > 0;
  return !!value;
}
