import { computed, useAttrs, type HTMLAttributes } from "vue";

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
