import { type Ref, computed, ref } from "vue";
import { asymComputed } from "./asymmetricComputed";

export type ManagedProp<T> = ManagedSymbolType | T;
export type ManagedSymbolType = typeof MANAGED_SYMBOL;
export const MANAGED_SYMBOL = Symbol("MANAGED_SYMBOL");

/**
 * Composable for conditionally managing state based on the prop value.
 *
 * When the prop value is not undefined, the prop value is always used.
 * If the prop value is undefined, then the internal state is used instead.
 *
 * @param prop `toRef(() => props.something)` ref of the optional prop.
 * @param initialState in case of the prop being initially undefined, this will be used as the initial state value.
 * @param emit function that is called when a state write is performed
 * @returns ref of the state and isManaged
 *
 * @example ```ts
 * // IMPORTANT: default value MUST be set to MANAGED_SYMBOL
 * const props = withDefaults(defineProps<{ isExpanded?: ManagedProp<boolean> }>(), { isExpanded: MANAGED_SYMBOL });
 * const emit = defineEmits<{ "update:isExpanded": [isExpanded: boolean] }>();
 *
 * const { state: isExpanded } = useManagedState(
 *  toRef(() => props.isExpanded),
 *  false,
 *  (v) => emit("update:isExpanded", v ?? false),
 * );
 * ```
 */
export const useManagedState = <
  T,
  Prop extends Readonly<Ref<T | ManagedSymbolType>>,
  Referable extends boolean = false,
  V = Referable extends true ? T | ManagedSymbolType : T,
>(
  prop: Prop,
  initialState: T,
  emit: (val: T) => void,
) => {
  const isManaged = computed(() => prop.value === MANAGED_SYMBOL);
  // eslint-disable-next-line vue/no-ref-object-reactivity-loss
  const internalState = ref(isManaged.value ? initialState : prop.value) as Ref<T>;

  const state = asymComputed({
    set: (val: T) => {
      internalState.value = val;
      emit(val);
    },
    get: () => (isManaged.value ? internalState.value : prop.value) as V,
  });

  return { state, isManaged };
};
