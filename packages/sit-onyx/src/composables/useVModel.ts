import { computed, ref } from "vue";

export type Nullable<T> = T | undefined | null;

export type UseVModelOptions<
  TKey extends string,
  TValue,
  TDefaultValue extends Nullable<TValue> = undefined,
> = {
  key: TKey;
  props: { [Key in TKey]?: Nullable<TValue> };
  emit: TDefaultValue extends undefined | null
    ? (evt: `update:${TKey}`, value?: Nullable<TValue>) => void
    : (evt: `update:${TKey}`, value: TValue) => void;
  defaultValue?: TDefaultValue;
};

export const useVModel = <
  TKey extends string,
  TValue,
  TDefaultValue extends Nullable<TValue> = undefined,
>(
  options: UseVModelOptions<TKey, TValue, TDefaultValue>,
) => {
  const internalState = ref<TValue | TDefaultValue>(options.defaultValue as TDefaultValue);

  const value = computed<TValue | TDefaultValue, Nullable<TValue>>({
    get: () =>
      options.props[options.key] !== undefined
        ? (options.props[options.key] as TValue | TDefaultValue)
        : internalState.value,
    set: (newValue) => {
      if (options.props[options.key] === undefined) {
        internalState.value = newValue as TValue | TDefaultValue;
        options.emit(`update:${options.key}`, newValue as TValue);
      } else {
        if (options.defaultValue == undefined) {
          options.emit(`update:${options.key}`, newValue as TValue);
        } else {
          options.emit(`update:${options.key}`, newValue ?? options.defaultValue);
        }
      }
    },
  });

  return value;
};
