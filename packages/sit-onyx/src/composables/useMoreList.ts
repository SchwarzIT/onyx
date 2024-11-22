import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  useId,
  watch,
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
export type MoreListInjectionKey = InjectionKey<
  ReturnType<typeof useMoreList> & {
    /**
     * Map of components in the list. Key = unique ID, value = component template ref
     */
    components: UseMoreListOptions["components"];
  }
>;

export type UseMoreListOptions = {
  /**
   * Vue template ref for the parent element containing the more indicator as well as the list of components.
   */
  parentRef: Ref<HTMLOrInstanceRef>;
  /**
   * Vue template ref for the element containing the list of components.
   */
  listRef: Ref<HTMLOrInstanceRef>;
  moreIndicatorRef: Ref<HTMLOrInstanceRef>;
  /**
   * Refs for the individual components in the list.
   */
  components: Map<string, { width: Ref<number> }>;
};

export const useMoreList = (options: UseMoreListOptions) => {
  const visibleElements = ref<string[]>([]);
  const hiddenElements = ref<string[]>([]);

  const { width: parentWidth } = useResizeObserver(
    computed(() => getTemplateRefElement(options.parentRef.value)),
  );

  const { width: indicatorWidth } = useResizeObserver(
    computed(() => getTemplateRefElement(options.moreIndicatorRef.value)),
  );

  const widthMap = ref(new Map<string, number>());

  // sync widthMap to components but keep component width if it changes to zero (e.g. because the element is hidden)
  // so we can continue calculating if hidden elements would fit into the available width if resized
  watch(
    options.components,
    (newValue) => {
      newValue.forEach((value, key) => {
        const newWidth = unref(value.width);
        if (widthMap.value.has(key) && newWidth === 0) return;
        widthMap.value.set(key, newWidth);
      });
    },
    { deep: true, immediate: true },
  );

  onMounted(() => {
    watchEffect(() => {
      const parentGap = getColumnGap(options.parentRef.value);
      const listGap = getColumnGap(options.listRef.value);
      let availableWidth = parentWidth.value;
      if (indicatorWidth.value > 0) {
        availableWidth -= indicatorWidth.value + parentGap;
      }
      if (availableWidth <= 0) return;

      const { visible, hidden } = Array.from(widthMap.value.entries()).reduce(
        (acc, [id, componentWidth], index) => {
          availableWidth -= componentWidth + (index > 0 ? listGap : 0);

          if (
            availableWidth >= 0 ||
            // check if last element would fit if more indicator is gone
            (index === widthMap.value.size - 1 && availableWidth + indicatorWidth.value >= 0)
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
     * If undefined, the visibility has not yet been initialized.
     */
    visibleElements,
    /**
     * IDs of currently fully or partially hidden components in the list.
     */
    hiddenElements,
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
  const { width } = useResizeObserver(computed(() => getTemplateRefElement(componentRef.value)));
  const moreContext = inject(injectionKey);

  moreContext?.components?.set(id, { width });
  onBeforeUnmount(() => moreContext?.components?.delete(id));

  const isVisible = computed(() => !moreContext?.hiddenElements.value.includes(id));

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
