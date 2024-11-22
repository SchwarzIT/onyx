import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  useId,
  watchEffect,
  type InjectionKey,
  type Ref,
} from "vue";
import {
  getTemplateRefElement,
  useResizeObserver,
  type HTMLOrInstanceRef,
} from "./useResizeObserver";

/**
 * Injection key for providing "more" data to child components of a list to e.g. render a "+3 more" indicator.
 */
export type MoreListInjectionKey = InjectionKey<ReturnType<typeof useMoreList>>;

export type UseMoreListOptions = {
  /**
   * Vue template ref for the parent element containing the more indicator as well as the list of components.
   */
  parentRef: Ref<HTMLOrInstanceRef>;
  /**
   * Vue template ref for the element containing the list of components.
   */
  listRef: Ref<HTMLOrInstanceRef>;
  /**
   * Vue template ref for the more indicator element that might be shown if not all elements are visible.
   */
  moreIndicatorRef: Ref<HTMLOrInstanceRef>;
};

/**
 * Composable for managing a list of components where e.g. a "+3" more indicator should be shown if not all components
 * fit into the available width.
 *
 * @example
 *
 * ```vue
 * <script lang="ts" setup>
 * import { provide, ref, watch } from "vue";
 * import { useMoreList, NAV_BAR_MORE_LIST_INJECTION_KEY } from "sit-onyx";
 *
 * const parentRef = ref<HTMLElement>();
 * const listRef = ref<HTMLElement>();
 * const moreIndicatorRef = ref<HTMLElement>();
 *
 * const more = useMoreList({ parentRef, listRef, moreIndicatorRef });
 * provide(NAV_BAR_MORE_LIST_INJECTION_KEY, more);
 * </script>
 *
 * <template>
 *   <div ref="parentRef" class="more-list">
 *     <div ref="listRef" class="more-list__elements">
 *        <OnyxNavButton v-for="i in 16" ref="componentRefs" :key="i" :label="`Nav button ${i}`" />
 *     </div>
 *
 *     <div ref="moreIndicatorRef" class="more-list__indicator">
 *        +{{ more.hiddenElements.value.length }} more
 *     </div>
 *   </div>
 * </template>
 *
 * <style lang="scss">
 * .more-list {
 *   display: flex;
 *   align-items: center;
 *   gap: var(--onyx-spacing-4xs);
 *
 *   &__elements {
 *     display: inherit;
 *     align-items: inherit;
 *     gap: inherit;
 *     overflow-x: clip;
 *    }
 *
 *   &__indicator {
 *     min-width: max-content;
 *     max-width: 100%;
 *   }
 * }
 * </style>
 * ```
 */
export const useMoreList = (options: UseMoreListOptions) => {
  const visibleElements = ref<string[]>([]);
  const hiddenElements = ref<string[]>([]);

  const { width: parentWidth } = useResizeObserver(options.parentRef);
  const { width: moreIndicatorWidth } = useResizeObserver(options.moreIndicatorRef);

  // type casting is needed to prevent TypeScript from unwrapping the type which will lead to "width" being a single number instead of Ref<number>
  const componentMap = ref(new Map()) as Ref<Map<string, { width: Ref<number> }>>;

  /**
   * Map of all component widths. Key = component ID, value = component width.
   * If component is hidden, this map will still include the previous width.
   */
  const memorizedComponentWidthMap = ref(new Map<string, number>());

  // sync widthMap to components but keep component width if it changes to zero (e.g. because the element is hidden)
  // so we can continue calculating if hidden elements would fit into the available width if resized
  watchEffect(() => {
    componentMap.value.forEach((value, key) => {
      const newWidth = unref(value.width);
      if (memorizedComponentWidthMap.value.has(key) && newWidth === 0) return;
      memorizedComponentWidthMap.value.set(key, newWidth);
    });
  });

  onMounted(() => {
    watchEffect(() => {
      let availableWidth = parentWidth.value;
      if (availableWidth <= 0) return; // parent width is not initialized yet

      const parentGap = getColumnGap(options.parentRef.value);
      const listGap = getColumnGap(options.listRef.value);

      if (moreIndicatorWidth.value > 0) {
        availableWidth -= moreIndicatorWidth.value + parentGap;
      }

      // calculate which components currently fully fit into the available parent width
      const { visible, hidden } = Array.from(memorizedComponentWidthMap.value.entries()).reduce(
        (acc, [id, componentWidth], index) => {
          availableWidth -= componentWidth + (index > 0 ? listGap : 0);

          if (
            availableWidth >= 0 ||
            // check if last element fits if more indicator would be hidden
            (index === memorizedComponentWidthMap.value.size - 1 &&
              availableWidth + moreIndicatorWidth.value >= 0)
          ) {
            acc.visible.push(id);
          } else {
            acc.hidden.push(id);
          }

          return acc;
        },
        { visible: [] as string[], hidden: [] as string[] },
      );

      visibleElements.value = visible;
      hiddenElements.value = hidden;
    });
  });

  return {
    /**
     * IDs of currently completely visible components in the list.
     */
    visibleElements,
    /**
     * IDs of currently fully or partially hidden components in the list.
     */
    hiddenElements,
    /**
     * Map of widths for all components in the list. Key = component ID.
     * Components in the list must inject this map and add a ref for their width to it.
     *
     * @see `useMoreListChild()`
     */
    componentMap,
  };
};

/**
 * Gets the CSS column-gap property for the given element or 0 if invalid or unset.
 */
const getColumnGap = (ref: HTMLOrInstanceRef) => {
  const element = getTemplateRefElement(ref);
  if (!element) return 0;
  // we use "|| 0" here to fallback to zero for NaN values when no/invalid gap exist
  return Number.parseFloat(getComputedStyle(element).columnGap) || 0;
};

/**
 * Composable that must be implemented in all list children when using `useMoreList` to correctly observe the visibility of the elements.
 *
 * @example
 *
 * ```vue
 * <script lang="ts" setup
 * const { componentRef, isVisible } = useMoreListChild();
 * </script>
 *
 * <template
 *  <div v-show="isVisible" ref="componentRef"> Your content... </div>
 * </template>
 * ```
 */
export const useMoreListChild = (injectionKey: MoreListInjectionKey) => {
  const id = useId();
  const componentRef = ref<HTMLOrInstanceRef>();
  const moreContext = inject(injectionKey);
  const { width } = useResizeObserver(componentRef);

  moreContext?.componentMap.value.set(id, { width });
  onBeforeUnmount(() => moreContext?.componentMap.value.delete(id));

  const isVisible = computed(() => moreContext?.visibleElements.value.includes(id) ?? true);

  return {
    /**
     * Component template ref.
     */
    componentRef,
    /**
     * Whether the component is currently visible.
     * Should hide itself visually (e.g. using `v-show="isVisible"`).
     */
    isVisible,
  };
};
