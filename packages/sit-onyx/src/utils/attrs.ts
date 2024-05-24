import { computed, useAttrs, type HtmlHTMLAttributes } from "vue";

/**
 * Extension of `useAttrs` which splits root attributes from other properties.
 * As root properties are considered: `style` and `class`.
 *
 * Make sure to call `defineOptions({ inheritAttrs: false });`.
 */
export const useRootAttrs = () => {
  const attrs = useAttrs();

  const rootAttrs = computed(
    () =>
      ({ class: attrs["class"], style: attrs["style"] }) as Pick<
        HtmlHTMLAttributes,
        "class" | "style"
      >,
  );

  const restAttrs = computed<Omit<HtmlHTMLAttributes, "class" | "style">>(() => {
    const rest = { ...attrs };
    delete rest.class;
    delete rest.style;
    return rest;
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
