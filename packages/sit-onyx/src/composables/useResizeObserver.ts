import { onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

export type UseResizeObserverOptions = {
  /**
   * Sets which box model the observer will observe changes to.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions;
};

/**
 * Template ref of either a native HTML element or a custom Vue component.
 */
export type VueTemplateRefElement = Element | { $el: Element } | null | undefined;

export const useResizeObserver = (
  /**
   * Target to observe. If undefined, the documentElement will be observed.
   */
  target?: Ref<VueTemplateRefElement>,
  options?: UseResizeObserverOptions,
) => {
  const box = options?.box ?? "content-box";
  const width = ref(0);
  const height = ref(0);

  const callback: ResizeObserverCallback = (entries) => {
    const entry = entries[0];

    const boxSize =
      box === "content-box"
        ? entry?.contentBoxSize
        : box === "border-box"
          ? entry?.borderBoxSize
          : entry?.devicePixelContentBoxSize;

    width.value = (boxSize ?? []).reduce((acc, { inlineSize }) => acc + inlineSize, 0);
    height.value = (boxSize ?? []).reduce((acc, { blockSize }) => acc + blockSize, 0);
  };

  // ensure ResizeObserver is only called on mount to support server side rendering
  onMounted(() => {
    if (!("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(callback);

    if (!target) {
      observer.observe(document.documentElement, { box });
      return;
    }

    watch(
      target,
      (newTargetRef, oldTargetRef) => {
        const newTarget = getTemplateRefElement(newTargetRef);
        const oldTarget = getTemplateRefElement(oldTargetRef);

        if (oldTarget) observer?.unobserve(oldTarget);
        if (newTarget) observer?.observe(newTarget, { box });
        else {
          // target was removed (e.g. with v-if so we need to reset the size manually)
          width.value = 0;
          height.value = 0;
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(() => observer.disconnect());
  });

  return { width, height };
};

/**
 * Gets the native HTML element of a template ref.
 */
export const getTemplateRefElement = (ref: VueTemplateRefElement) => {
  return ref instanceof Element ? ref : ref?.$el;
};
