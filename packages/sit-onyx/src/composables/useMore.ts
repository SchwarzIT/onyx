import {
  computed,
  onBeforeUnmount,
  ref,
  watchEffect,
  type ComponentPublicInstance,
  type Ref,
} from "vue";

export type UseMoreOptions = {
  /**
   * Vue template ref for the parent element containing the list of components.
   */
  parentRef: Ref<HTMLElement | null | undefined>;
  /**
   * Refs for the individual components in the list.
   */
  componentRefs: Ref<(HTMLElement | Pick<ComponentPublicInstance, "$el">)[]>;
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
 * import { ref } from "vue";
 * import { useMore } from "../../composables/useMore";
 * import OnyxNavButton from "../OnyxNavBar/modules/OnyxNavButton/OnyxNavButton.vue";
 *
 * const parentRef = ref<HTMLElement>();
 * const componentRefs = ref<InstanceType<typeof OnyxNavButton>[]>([]);
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
 *     overflow: hidden;
 *     flex-wrap: nowrap;
 *     gap: var(--onyx-spacing-sm);
 *   }
 * }
 * </style>
 * ```
 */
export const useMore = (options: UseMoreOptions) => {
  const visibleElements = ref(0);
  const totalElements = computed(() => options.componentRefs.value.length);
  const hiddenElements = computed(() => totalElements.value - visibleElements.value);

  const observer = ref<IntersectionObserver>();
  onBeforeUnmount(() => observer.value?.disconnect());

  watchEffect(() => {
    observer.value?.disconnect(); // reset observer before all changes
    if (!options.parentRef.value || options.disabled) return;

    observer.value = new IntersectionObserver(
      (res) => {
        // res contains all changed components (not all available components)
        // if component is shown, intersectionRatio is 1 so remainingItems should be decremented
        // otherwise remainingItems should be increment because component is no longer shown
        const shownElements = res.reduce(
          (prev, curr) => (curr.intersectionRatio === 1 ? prev + 1 : prev),
          0,
        );
        const hiddenChips = res.length - shownElements;

        if (visibleElements.value <= 0) visibleElements.value = shownElements;
        else visibleElements.value += shownElements - hiddenChips;
      },
      { root: options.parentRef.value, threshold: 1 },
    );

    options.componentRefs.value.forEach((element) => {
      const htmlElement = element instanceof HTMLElement ? element : element.$el;
      observer.value?.observe(htmlElement);
    });
  });

  return {
    /**
     * Number of currently completely visible components in the list.
     */
    visibleElements,
    /**
     * Number of currently not or not fully visible components in the list.
     */
    hiddenElements,
    /**
     * Total number of elements in the list independent on their visibility.
     */
    totalElements,
  };
};
