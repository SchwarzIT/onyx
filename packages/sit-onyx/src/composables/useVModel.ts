import { computed, ref } from "vue";
export type Nullable<T> = T | undefined | null;
export type UseVModelOptions<
  TKey extends keyof TProps & string,
  TProps extends object,
  TValue extends TProps[TKey],
  TDefaultValue = Nullable<TValue>,
> = {
  key: TKey;
  props: TProps;
  emit: TValue extends undefined | null
    ? (evt: `update:${TKey}`, value?: Nullable<TValue>) => void
    : (evt: `update:${TKey}`, value: TValue) => void;
  defaultValue?: TDefaultValue;
};
export const useVModel = <
  TKey extends keyof TProps & string,
  TProps extends object,
  TValue extends TProps[TKey],
  TDefaultValue = Nullable<TValue>,
>(
  options: UseVModelOptions<TKey, TProps, TValue, TDefaultValue>,
) => {
  const internalState = ref(options.defaultValue);
  const value = computed<TValue>({
    get: () =>
      options.props[options.key] !== undefined ? options.props[options.key] : internalState.value,
    set: (newValue) => {
      internalState.value = newValue;
      options.emit(`update:${options.key}`, newValue ?? (options.defaultValue as TValue));
    },
  });
  return value;
};
