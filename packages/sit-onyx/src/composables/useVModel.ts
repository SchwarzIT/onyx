import { computed } from "vue";

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
  const value = computed<TValue | TDefaultValue, Nullable<TValue>>({
    get: () => (options.props[options.key] ?? options.defaultValue) as TValue | TDefaultValue,
    set: (newValue) => {
      if (options.defaultValue == undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.emit(`update:${options.key}`, newValue as any);
      } else {
        options.emit(`update:${options.key}`, newValue ?? options.defaultValue);
      }
    },
  });

  return value;
};
