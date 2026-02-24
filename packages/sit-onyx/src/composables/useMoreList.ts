import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRef,
  toValue,
  useId,
  watch,
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import {
  getTemplateRefElement,
  useResizeObserver,
  type VueTemplateRefElement,
} from "./useResizeObserver.js";

/**
 * Injection key for providing "more" data to child components of a list to e.g. render a "+3 more" indicator.
 */
export type MoreListInjectionKey = InjectionKey<ReturnType<typeof useMoreList>>;

export type UseMoreListOptions = {
  /**
   * Vue template ref for the parent element containing the more indicator as well as the list of components.
   */
  parentRef: Ref<VueTemplateRefElement>;
  /**
   * Vue template ref for the element containing the list of components.
   */
  listRef: Ref<VueTemplateRefElement>;
  /**
   * Vue template ref for the more indicator element that might be shown if not all elements are visible.
   */
  moreIndicatorRef: Ref<VueTemplateRefElement>;
  /**
   * From which direction the list items should start to be hidden, when space is limited.
   * ltr/rtl -> horizontal
   * ttb/btt -> vertical
   * @default "rtl"
   */
  direction: MaybeRefOrGetter<"rtl" | "ltr" | "ttb" | "btt">;
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
 *        <OnyxNavItem v-for="i in 16" ref="componentRefs" :key="i" :label="`Nav button ${i}`" />
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
  const visibleElements = ref<string[]>();
  const hiddenElements = ref<string[]>();

  const { width: parentWidth, height: parentHeight } = useResizeObserver(options.parentRef);
  const { width: moreIndicatorWidth, height: moreIndicatorHeight } = useResizeObserver(
    options.moreIndicatorRef,
  );

  /**
   * Map of all component widths. Key = component ID, value = component width.
   * If component is hidden, this map will still include the previous width.
   */
  const componentMap = reactive(new Map<string, { width: number; height: number }>());

  const isVertical = computed(() => {
    const dir = toValue(options.direction);
    return dir === "ttb" || dir === "btt";
  });
  onMounted(() => {
    watch(
      [
        parentWidth,
        parentHeight,
        moreIndicatorWidth,
        moreIndicatorHeight,
        componentMap,
        toRef(options.direction),
        isVertical,
      ],
      () => {
        const vertical = isVertical.value;

        let availableSpace = vertical ? parentHeight.value : parentWidth.value;
        const indicatorSpace = vertical ? moreIndicatorHeight.value : moreIndicatorWidth.value;

        if (availableSpace <= 0) return; // parent width is not initialized yet

        const parentGap = getGap(options.parentRef.value, vertical);
        const listGap = getGap(options.listRef.value, vertical);

        if (indicatorSpace > 0) {
          availableSpace -= indicatorSpace + parentGap;
        }

        // calculate which components currently fully fit into the available parent width
        // we don't need to worry about changing the refs multiple times here since Vue batches changes
        visibleElements.value = [];
        hiddenElements.value = [];

        const allComponents = Array.from(componentMap.entries());
        const dir = toValue(options.direction);

        if (dir === "ltr" || dir === "ttb") {
          allComponents.reverse();
        }

        allComponents.forEach(([id, dimensions], index, { length }) => {
          const componentSize = vertical ? dimensions.height : dimensions.width;
          availableSpace -= componentSize + (index > 0 ? listGap : 0);

          if (
            availableSpace >= 0 ||
            // check if last element fits if more indicator would be hidden
            (index === length - 1 && availableSpace + indicatorSpace >= 0)
          ) {
            visibleElements.value!.push(id);
          } else {
            hiddenElements.value!.push(id);
          }
        });
      },
      {
        // The rendering should happen before we calculated the visible elements. This way we can ensure, that the widths are already up-to-date.
        flush: "post",
      },
    );
  });

  return {
    /**
     * IDs of currently completely visible components in the list.
     * Initially `undefined`, in that case treat all components as visible.
     */
    visibleElements,
    /**
     * IDs of currently fully or partially hidden components in the list.
     * Initially `undefined`, in that case treat all components as visible.
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
 * Gets the CSS gap property for the given element or 0 if invalid or unset.
 */
const getGap = (ref: VueTemplateRefElement, isVertical: boolean) => {
  const element = getTemplateRefElement(ref);
  if (!element) return 0;

  const style = getComputedStyle(element);
  const gap = isVertical ? style.rowGap : style.columnGap;
  // we use "|| 0" here to fallback to zero for NaN values when no/invalid gap exist
  return Number.parseFloat(gap) || 0;
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
  const componentRef = ref<VueTemplateRefElement>();
  const moreContext = inject(injectionKey, undefined);
  const { width, height } = useResizeObserver(componentRef, { box: "border-box" });

  watch(
    [width, height],
    ([newWidth, newHeight]) => {
      const map = moreContext?.componentMap;
      // do not reset width if width or height is 0 = component is hidden because the more list still
      // needs the previous to calculate if component can be shown when resizing the screen larger
      if (!map || (map.has(id) && newWidth === 0 && newHeight === 0)) return;
      map.set(id, { width: newWidth, height: newHeight });
    },
    { immediate: true },
  );

  onBeforeUnmount(() => moreContext?.componentMap.delete(id));

  const isVisible = computed(() => moreContext?.visibleElements.value?.includes(id) ?? true);

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
