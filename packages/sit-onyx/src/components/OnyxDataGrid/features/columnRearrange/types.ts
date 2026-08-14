import type { MaybeRefOrGetter, Ref } from "vue";

export type ColumnRearrangeState = {
  active: boolean;
  order: Map<PropertyKey, number>;
};

export type ColumnRearrangeOptions = {
  enabled?: MaybeRefOrGetter<boolean>;
  state?: Ref<ColumnRearrangeState>;
};
