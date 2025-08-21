import { computed, ref, toRef, watch, type Ref } from "vue";
import type { Nullable, PrimitiveType } from "../types/index.js";

export type UseVModelOptions<
  TProps extends object,
  TKey extends keyof TProps & string,
  TValue extends TProps[TKey] = TProps[TKey],
  TDefaultValue extends
    | undefined
    | (TValue extends PrimitiveType | undefined ? TValue : () => TValue) =
    | undefined
    | (TValue extends PrimitiveType | undefined ? TValue : () => TValue),
  TComputed extends TDefaultValue extends undefined | null
    ? TValue
    : NonNullable<TValue> = TDefaultValue extends undefined | null ? TValue : NonNullable<TValue>,
  TEmit extends (evt: `update:${TKey}`, value: TComputed) => void = (
    evt: `update:${TKey}`,
    value: TComputed,
  ) => void,
> = {
  key: TKey;
  props: TProps;
  emit: TEmit;
  default?: TDefaultValue;
};

// region docs
/**
 * Composable for managing the v-model behavior of a prop.
 * It's behavior differs from the `defineModel` behavior, in that it will always prefer the bound value over the internal state.
 * This allows for better control over the component's state, e.g. a flyout can be kept open even when it was supposed to close.
 *
 * There is currently no way to differentiate between an explicitly bound `undefined` prop value (e.g. `<Comp :value="undefined" />`) and a implicit `undefined` from not defined prop (e.g. `<Comp />`).
 * Therefore for `null` or `undefined` values, the internal state or default value will always be used.
 *
 * For default values with non-primitive types, it's required to use a factory function that returns the default value to avoid mutating the former value.
 *
 * @example ```typescript
 *    const props = defineProps<{
 *        modelValue?: string;
 *    }>();
 *
 *    const emit = defineEmits<{ "update:modelValue": [string] }>();
 *
 *    const modelValue = useVModel({
 *      props,
 *      emit,
 *      key: "modelValue",
 *      default: "",
 *    });
```
 */
export const useVModel = <
  TProps extends object,
  TKey extends keyof TProps & string,
  TValue extends TProps[TKey] = TProps[TKey],
  TDefaultValue extends
    | undefined
    | (TValue extends PrimitiveType | undefined ? TValue : () => TValue) =
    | undefined
    | (TValue extends PrimitiveType | undefined ? TValue : () => TValue),
  TComputed extends TDefaultValue extends undefined | null
    ? TValue
    : NonNullable<TValue> = TDefaultValue extends undefined | null ? TValue : NonNullable<TValue>,
  TEmit extends (evt: `update:${TKey}`, value: TComputed) => void = (
    evt: `update:${TKey}`,
    value: TComputed,
  ) => void,
>(
  options: UseVModelOptions<TProps, TKey, TValue, TDefaultValue, TComputed, TEmit>,
) => {
  // endregion docs
  const prop = toRef(options.props, options.key) as Ref<TValue>;

  const getDefault = () =>
    typeof options.default === "function" ? options.default() : options.default;

  // The Internal state will always be the latest value received from either a prop update or emitted value update.
  const internalState = ref(getDefault()) as Ref<Nullable<TValue>>;

  watch(prop, (newProp) => (internalState.value = newProp)); // update internal state when prop updates

  const value = computed({
    get: () => prop.value ?? internalState.value ?? getDefault(),
    set: (newValue: TComputed) => {
      if (newValue !== value.value) {
        internalState.value = newValue; // update internal state when new value is emitted
        options.emit(`update:${options.key}`, newValue);
      }
    },
  });
  return value as Ref<TComputed>;
};
