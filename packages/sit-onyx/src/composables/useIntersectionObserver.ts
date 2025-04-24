import { onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

import type { VueTemplateRefElement } from "./useResizeObserver";
export type UseIntersectionObserverOptions = {
  /**
   * Sets the root element to use for intersection checking.
   *
   * @default null
   */
  root?: Element | null;
  /**
   * Margin around the root element.
   *
   * @default '0px'
   */
  rootMargin?: string;
  /**
   * Thresholds at which to trigger the callback.
   *
   * @default [0]
   */
  thresholds?: number | number[];
};

export const useIntersectionObserver = (
  target?: Ref<VueTemplateRefElement>,
  options?: UseIntersectionObserverOptions,
) => {
  const isIntersecting = ref(false);

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      isIntersecting.value = entry.isIntersecting;
    });
  };

  onMounted(() => {
    const observer = new IntersectionObserver(callback, {
      root: options?.root ?? null,
      rootMargin: options?.rootMargin ?? "0px",
      threshold: options?.thresholds ?? [0],
    });

    if (!target?.value) {
      observer.observe(document.documentElement);
      return;
    }

    watch(
      target,
      (newTargetRef, oldTargetRef) => {
        const newTarget = getTemplateRefElement(newTargetRef);
        const oldTarget = getTemplateRefElement(oldTargetRef);

        if (oldTarget) observer.unobserve(oldTarget);
        if (newTarget) observer.observe(newTarget);
      },
      { immediate: true },
    );

    onBeforeUnmount(() => observer.disconnect());
  });

  return { isIntersecting };
};

/**
 * Gets the native HTML element of a template ref.
 */
export const getTemplateRefElement = (ref: VueTemplateRefElement) => {
  return ref instanceof Element ? ref : ref?.$el;
};
