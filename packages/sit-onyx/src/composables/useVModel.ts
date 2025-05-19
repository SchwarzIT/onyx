import { computed, ref, watch, type Ref } from "vue";
import type { PrimitiveType } from "../types";
export type Nullable<T> = T | undefined | null;
export type UseVModelOptions<
  TKey extends keyof TProps & string,
  TProps extends object,
  TValue extends TProps[TKey],
  TEmit extends (evt: `update:${TKey}`, value: TValue) => void,
  TDefaultValue extends (TValue extends PrimitiveType ? TValue : () => TValue) | undefined,
> = {
  key: TKey;
  props: TProps;
  emit: TEmit;
  default?: TDefaultValue;
};

export const useVModel = <
  TValue extends TProps[TKey],
  TKey extends keyof TProps & string,
  TProps extends object,
  TDefaultValue extends (TValue extends PrimitiveType ? TValue : () => TValue) | undefined,
  TEmit extends (evt: `update:${TKey}`, value: TValue) => void = (
    evt: `update:${TKey}`,
    value: TValue,
  ) => void,
  TComputed = TDefaultValue extends undefined ? TValue : NonNullable<TValue>,
>(
  options: UseVModelOptions<TKey, TProps, TValue, TEmit, TDefaultValue>,
) => {
  const getDefault = () =>
    typeof options.default === "function" ? options.default() : options.default;

  const internalState = ref(getDefault()) as Ref<Nullable<TValue>>;
  watch(
    () => options.props[options.key],
    (newProp) => (internalState.value = newProp as TValue),
  );

  const value = computed({
    get: () => options.props[options.key] ?? internalState.value ?? getDefault(),
    set: (newValue: TValue) => {
      if (newValue !== value.value) {
        internalState.value = newValue;
        options.emit(`update:${options.key}`, newValue);
      }
    },
  });
  return value as Ref<TComputed>;
};
