import { type Ref, computed, ref } from "vue";

declare const MANAGED_S: symbol;

export type MANAGED_SYM = typeof MANAGED_S;

export const MANAGED_SYMBOL = Symbol("MANAGED_SYMBOL") as MANAGED_SYM;

/**
 * Composable for conditionally managing state based on the prop value.
 *
 * When the prop value is not undefined, the prop value is always used.
 * If the prop value is undefined, then the internal state is used instead.
 *
 * @param prop `toRef(() => props.something)` ref of the optional prop.
 * @param initialState in case of the prop being initially undefined, this will be used as the initial state value.
 * @param emit function that is called when a state write is performed
 * @returns ref of the state
 *
 * @example ```ts
 * // IMPORTANT: default value MUST be set to undefined
 * const props = withDefaults(defineProps<{ isExpanded?: boolean }>(), { isExpanded: undefined });
 * const emit = defineEmits<{ "update:isExpanded": [isExpanded: boolean] }>();
 *
 * const isExpanded = useManagedState(
 *  toRef(() => props.isExpanded),
 *  false,
 *  (v) => emit("update:isExpanded", v ?? false),
 * );
 * ```
 */
export const useManagedState = <Prop extends Readonly<Ref<T | MANAGED_SYM>>, T>(
  prop: Prop,
  initialState: T,
  emit: (val: T) => void,
  referable?: boolean,
) => {
  const isManaged = computed(() => prop.value === MANAGED_SYMBOL);
  const internalState = ref(isManaged.value ? initialState : prop.value) as Ref<T>;

  return computed<T>({
    set: (val: T) => {
      internalState.value = val;
      emit(val);
    },
    get: () => (isManaged.value && !referable ? internalState.value : (prop.value as T)),
  });
};
