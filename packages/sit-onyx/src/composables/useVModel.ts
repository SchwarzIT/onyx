import { computed, ref, type Ref } from "vue";
export type Nullable<T> = T | undefined | null;
export type UseVModelOptions<
  TKey extends keyof TProps & string,
  TProps extends object,
  TValue extends TProps[TKey],
  TEmit extends (evt: `update:${TKey}`, value: TValue) => void,
  TDefaultValue extends NonNullable<TValue> | undefined,
> = {
  key: TKey;
  props: TProps;
  emit: TEmit;
  initialValue?: TDefaultValue;
};

export const useVModel = <
  TKey extends keyof TProps & string,
  TProps extends object,
  TValue extends TProps[TKey],
  TDefaultValue extends NonNullable<TValue> | undefined,
  TEmit extends (evt: `update:${TKey}`, value: TValue) => void = (
    evt: `update:${TKey}`,
    value: TValue,
  ) => void,
  TComputed = TDefaultValue extends undefined ? TValue : NonNullable<TValue>,
>(
  options: UseVModelOptions<TKey, TProps, TValue, TEmit, TDefaultValue>,
) => {
  const internalState = ref(options.initialValue) as Ref<Nullable<TValue>>;
  const value = computed({
    get: () =>
      options.props[options.key] !== undefined ? options.props[options.key] : internalState.value,
    set: (newValue: TValue) => {
      internalState.value = newValue;
      options.emit(`update:${options.key}`, newValue);
    },
  });
  return value as Ref<TComputed>;
};
