import {
  computed,
  inject,
  onBeforeUnmount,
  ref,
  unref,
  useId,
  watch,
  type InjectionKey,
  type Ref,
} from "vue";

export type HTMLOrInstanceRef = Element | { $el: Element } | null | undefined;

export type MoreInjectionKey = InjectionKey<{
  components: Map<string, Ref<HTMLOrInstanceRef>>;
  visibleComponents: Ref<string[]>;
}>;

export type UseMoreOptions = {
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
  const visibleElements = ref<string[]>([]);

  const hiddenElements = computed(() => {
    return Array.from(options.componentRefs.keys()).filter(
      (key) => !visibleElements.value.includes(key),
    );
  });

  const observer = ref<IntersectionObserver>();
  onBeforeUnmount(() => observer.value?.disconnect());

  watch(
    [options.parentRef, options.componentRefs, options.disabled],
    () => {
      observer.value?.disconnect(); // reset observer before all changes

      const root = refToHTMLElement(options.parentRef.value);
      if (!root || options.disabled?.value) {
        visibleElements.value = [];
        return;
      }

      observer.value = new IntersectionObserver(
        (changeEntries) => {
          // changeEntries contains all changed components (not all available components)
          // if component is shown, intersectionRatio is 1 so remainingItems should be decremented
          // otherwise remainingItems should be increment because component is no longer shown
          const shownIds: string[] = [];
          const hiddenIds: string[] = [];

          changeEntries.forEach((entry) => {
            const id = Array.from(options.componentRefs).find(([_, element]) =>
              refToHTMLElement(unref(element))?.isSameNode(entry.target),
            )?.[0];
            if (!id) return;

            const isFullyVisible = entry.intersectionRatio === 1;

            if (isFullyVisible) shownIds.push(id);
            else hiddenIds.push(id);
          });

          if (visibleElements.value.length === 0) {
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
        const element = refToHTMLElement(unref(ref));
        if (!element) return;
        observer.value?.observe(element);
      });
    },
    { immediate: true },
  );

  return {
    /**
     * IDs of currently completely visible components in the list.
     */
    visibleElements,
    /**
     * Number of currently not or not fully visible components in the list.
     */
    hiddenElements,
  };
};

const refToHTMLElement = (ref: HTMLOrInstanceRef) => {
  return ref instanceof Element ? ref : ref?.$el;
};

export const useMoreChild = (injectionKey: MoreInjectionKey) => {
  const id = useId();
  const componentRef = ref<HTMLOrInstanceRef>();
  const moreContext = inject(injectionKey);

  moreContext?.components?.set(id, componentRef);
  onBeforeUnmount(() => moreContext?.components?.delete(id));

  const isVisible = computed(() => moreContext?.visibleComponents.value.includes(id) ?? true);

  return {
    /**
     * Component template ref.
     *
     * @example
     *
     * ```vue
     * <script lang="ts" setup
     * const { componentRef } = useMoreChild();
     * </script>
     *
     * <template
     *  <div ref="componentRef"> Your content... </div>
     * </template>
     * ```
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
