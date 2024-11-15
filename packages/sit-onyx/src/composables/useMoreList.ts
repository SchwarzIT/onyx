import { debounce } from "@sit-onyx/headless";
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  ref,
  unref,
  useId,
  watch,
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
export type MoreListInjectionKey = InjectionKey<{
  /**
   * Map of components in the list. Key = unique ID, value = component template ref
   */
  components: Map<string, Ref<HTMLOrInstanceRef>>;
  /**
   * List of component IDs that are currently fully visible.
   * If undefined, the visibility has not yet been initialized.
   */
  visibleElements: Ref<string[] | undefined>;
  /**
   * Whether the intersection observer should be disabled (e.g. when more feature is currently not needed due to mobile layout).
   */
  disabled: Ref<boolean>;
}>;

export type UseMoreListOptions = {
  /**
   * Vue template ref for the parent element containing the list of components.
   */
  parentRef: Ref<HTMLOrInstanceRef>;
  /**
   * Refs for the individual components in the list.
   */
  componentRefs: Map<string, Ref<HTMLOrInstanceRef>>;
  /**
   * Whether the intersection observer should be disabled (e.g. when more feature is currently not needed due to mobile layout).
   */
  disabled?: Ref<boolean>;
};

/**
 * Composable for managing a list of components where e.g. a "+3" more indicator should be shown if not all components
 * fit into the available width.
 *
 * @example
 *
 * ```vue
 * <script lang="ts" setup>
 * import { ref, type ComponentInstance } from "vue";
 * import { useMore } from "../../composables/useMore";
 * import OnyxNavButton from "../OnyxNavBar/modules/OnyxNavButton/OnyxNavButton.vue";
 *
 * const parentRef = ref<HTMLElement>();
 * const componentRefs = ref<ComponentInstance<typeof OnyxNavButton>[]>([]);
 *
 * const { visibleElements, hiddenElements } = useMore({ parentRef, componentRefs });
 * </script>
 *
 * <template>
 *   <div ref="parentRef" class="onyx-more">
 *     <OnyxNavButton v-for="i in 16" ref="componentRefs" :key="i" :label="`Nav button ${i}`" />
 *   </div>
 * </template>
 *
 * <style lang="scss">
 * @use "../../styles/mixins/layers.scss";
 *
 * .onyx-more {
 *   @include layers.component() {
 *     display: flex;
 *     align-items: center;
 *     overflow-x: clip;
 *   }
 * }
 * </style>
 * ```
 */
export const useMoreList = (options: UseMoreListOptions) => {
  const visibleElements = ref<string[]>();

  const hiddenElements = computed(() => {
    return Array.from(options.componentRefs.keys()).filter(
      (key) => !visibleElements.value?.includes(key),
    );
  });

  const observer = ref<IntersectionObserver>();
  onBeforeUnmount(() => observer.value?.disconnect());

  watch(
    [options.parentRef, options.componentRefs, options.disabled],
    () => {
      observer.value?.disconnect(); // reset observer before all changes

      const root = getTemplateRefElement(options.parentRef.value);
      if (!root || options.disabled?.value) {
        visibleElements.value = undefined;
        return;
      }

      observer.value = new IntersectionObserver(
        (changeEntries) => {
          // changeEntries contains all changed component visibilities (not all available components)
          // if component is shown, intersectionRatio is 1, otherwise its completely or partially hidden
          const shownIds: string[] = [];
          const hiddenIds: string[] = [];

          changeEntries.forEach((entry) => {
            const elementId = Array.from(options.componentRefs).find(([_, element]) => {
              return getTemplateRefElement(unref(element)) === entry.target;
            })?.[0];
            if (!elementId) return;

            const isFullyVisible = entry.intersectionRatio === 1;

            if (isFullyVisible) shownIds.push(elementId);
            else hiddenIds.push(elementId);
          });

          if (!visibleElements.value?.length) {
            visibleElements.value = shownIds;
          } else {
            visibleElements.value = visibleElements.value
              // remove now hidden elements
              .filter((id) => !hiddenIds.includes(id))
              // add newly visible elements
              .concat(shownIds);
          }
        },
        { root, threshold: 1 },
      );

      options.componentRefs.forEach((ref) => {
        const element = getTemplateRefElement(unref(ref));
        if (!element) return;
        observer.value?.observe(element);
      });
    },
    { immediate: true },
  );

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
 * Composable that must be implemented in all list children when using `useMore` to correctly observe the visibility of the elements.
 *
 * @example
 *
 * ```vue
 * <script lang="ts" setup
 * const { componentRef, isVisible } = useMoreChild();
 * </script>
 *
 * <template
 *  <div ref="componentRef" :class="{ hidden: !isVisible }"> Your content... </div>
 * </template>
 *
 * <style>
 * .hidden {
 *  visibility: hidden;
 * }
 * </style>
 * ```
 */
export const useMoreListChild = (injectionKey: MoreListInjectionKey) => {
  const id = useId();
  const componentRef = ref<HTMLOrInstanceRef>();
  const moreContext = inject(injectionKey);

  moreContext?.components?.set(id, componentRef);
  onBeforeUnmount(() => moreContext?.components?.delete(id));

  const { width } = useResizeObserver();
  const isVisible = ref(true);
  const isChecking = ref(false);

  const widthDebounce = ref(width.value);
  const updateDebounceWidth = debounce(() => (widthDebounce.value = width.value), 100);
  watch(width, () => updateDebounceWidth());

  watch([width, () => moreContext?.visibleElements.value], async ([newWidth], [oldWidth]) => {
    if (moreContext?.visibleElements.value === undefined) return; // ignore if visibility is not yet initialized
    if (isChecking.value) return;
    isChecking.value = true;

    isVisible.value = true; // force render all tabs so visibility can checked again by the intersection observer

    await nextTick();

    if (newWidth > oldWidth) {
      // TODO: check why this is needed
      await new Promise((resolve) => setTimeout(resolve));
    }

    isVisible.value =
      moreContext?.disabled.value || (moreContext?.visibleElements.value.includes(id) ?? true);
    isChecking.value = false;
  });

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
