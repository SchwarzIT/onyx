import {
  computed,
  customRef,
  isProxy,
  mergeProps,
  toRaw,
  useAttrs,
  type HTMLAttributes,
  type Ref,
  type VNodeProps,
  type VNodeRef,
} from "vue";

// region docs
/**
 * Extension of `useAttrs` which splits root attributes from other properties.
 * As root properties are considered: `style` and `class`.
 *
 * Make sure to call `defineOptions({ inheritAttrs: false });`.
 *
 * @example
 * ```vue
 * <script setup>
 *   defineOptions({ inheritAttrs: false });
 *   const { rootAttrs, restAttrs } = useRootAttrs();
 * </script>
 * <template>
 *   <div class="onyx-component" v-bind="rootAttrs">
 *    <!-- ... -->
 *      <input
 *        // some other attributes...
 *        v-bind="restAttrs"
 *      />
 *    <!-- ... -->
 *   </div>
 * </template>
 */
export const useRootAttrs = <T extends HTMLAttributes = HTMLAttributes>() => {
  // endregion docs
  const attrs = useAttrs();

  const rootAttrs = computed(
    () => ({ class: attrs["class"], style: attrs["style"] }) as Pick<T, "class" | "style">,
  );

  const restAttrs = computed(() => {
    const rest = { ...attrs };
    delete rest.class;
    delete rest.style;
    return rest as Omit<T, "class" | "style">;
  });

  return {
    /**
     * Contains the `class` and `style` fall-through attributes, if set.
     */
    rootAttrs,
    /**
     * Contains all fall-through attributes except `class` and `style`.
     */
    restAttrs,
  };
};

const MERGED_REFS_SYMBOL = Symbol("MERGED_REFS");

 
type MergedRef = Ref & {
  /**
   * In this array we store the refs that we want to keep in sync.
   */
  [MERGED_REFS_SYMBOL]: VNodeRef[];
};

/**
 * Creates a new `ref` that syncs the `toMerge` refs uni-directional.
 * Only intended to be used for template/vnode refs.
 */
const createMergedRef = <T>(...toMerge: VNodeRef[]) => {
  let value: T;
  const _ref = customRef((track, trigger) => {
    return {
      [MERGED_REFS_SYMBOL]: toMerge ?? [],
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = Array.isArray(newValue) && newValue.length === 1 ? newValue.at(0) : newValue;
        _ref[MERGED_REFS_SYMBOL].forEach((r) => {
          switch (typeof r) {
            case "function":
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              r(value as any, []);
              break;
            case "object":
              r.value = value;
              break;
            default:
              import.meta.env.DEV &&
                // eslint-disable-next-line no-console -- show console error in dev mode
                console.error(
                  `Template Ref of type "${typeof r}" is not supported and cannot be merged!`,
                );
          }
        });
        trigger();
      },
    };
  }) as MergedRef;
  _ref[MERGED_REFS_SYMBOL] = toMerge ?? [];

  return _ref;
};

const isMergedRef = (_ref: unknown): _ref is MergedRef =>
  !!_ref && typeof _ref === "function" && MERGED_REFS_SYMBOL in _ref;

type VProps = object & VNodeProps;

/**
 * Extends the Vue's `mergeProp` function, so that it
 *   - doesn't complain about nullish parameters
 *   - is also able to merge `ref` properties
 */
export const mergeVueProps = <T extends VProps | null | undefined>(...args: T[] | []) =>
  args.reduce((prev, curr) => {
    const currRef = curr && isProxy(curr) && "ref" in curr ? toRaw(curr).ref : curr?.ref;
    const prevRef = prev?.ref;
    const merged = mergeProps(prev, (curr ?? {}) as VProps);

    // when there is only a single or no ref defined, we can rely on the default merge logic
    if (!prevRef && !currRef) {
      return merged;
    }
    if (!prevRef || !currRef) {
      merged.ref = currRef ?? prevRef;
      return merged;
    }

    let mergedRef: MergedRef;
    // use existing merged ref, otherwise create a new one
    if (isMergedRef(prevRef)) {
      prevRef[MERGED_REFS_SYMBOL].push(currRef);
      mergedRef = prevRef;
    } else if (isMergedRef(currRef)) {
      currRef[MERGED_REFS_SYMBOL].push(prevRef);
      mergedRef = currRef;
    } else {
      mergedRef = createMergedRef(prevRef, currRef);
    }
    merged.ref = mergedRef;
    return merged;
  }, {} as VProps) as NonNullable<T>;
