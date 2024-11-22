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
import { useResizeObserver } from "./useResizeObserver";

/**
 * Template ref of either a native HTML element or a custom Vue component.
 */
export type HTMLOrInstanceRef = Element | { $el: Element } | null | undefined;

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

export const useMoreList = (options: UseMoreListOptions) => {
  const visibleElements = ref<string[]>([]);
  const hiddenElements = ref<string[]>([]);

  const { width: parentWidth } = useResizeObserver(
    computed(() => getTemplateRefElement(options.parentRef.value)),
  );

  const { width: moreIndicatorWidth } = useResizeObserver(
    computed(() => getTemplateRefElement(options.moreIndicatorRef.value)),
  );

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
 * Gets the native HTML element of a template ref.
 */
const getTemplateRefElement = (ref: HTMLOrInstanceRef) => {
  return ref instanceof Element ? ref : ref?.$el;
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

export const useMoreListChild = (injectionKey: MoreListInjectionKey) => {
  const id = useId();
  const componentRef = ref<HTMLOrInstanceRef>();
  const moreContext = inject(injectionKey);
  const { width } = useResizeObserver(computed(() => getTemplateRefElement(componentRef.value)));

  moreContext?.componentMap.value.set(id, { width });
  onBeforeUnmount(() => moreContext?.componentMap.value.delete(id));

  const isVisible = computed(() => moreContext?.visibleElements.value.includes(id));

  return {
    /**
     * Component template ref.
     */
    componentRef,
    /**
     * Whether the component is currently visible.
     * Should hide itself visually (e.g. using "visibility: hidden").
     * Do not use v-if, v-show or "display: none" since the more feature does not work then when resizing
     */
    isVisible,
  };
};
