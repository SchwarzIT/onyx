import { onBeforeMount, onBeforeUnmount, ref, watch, type Ref } from "vue";

export type UseResizeObserverOptions = {
  /**
   * Sets which box model the observer will observe changes to.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions;
};

export const useResizeObserver = (
  /**
   * Target to observe. If undefined, the documentElement will be observed.
   */
  target?: Ref<Element | undefined>,
  options?: UseResizeObserverOptions,
) => {
  const box = options?.box ?? "content-box";
  const width = ref(0);
  const height = ref(0);

  const callback: ResizeObserverCallback = (entries) => {
    const boxSize =
      box === "content-box"
        ? entries[0].contentBoxSize
        : box === "border-box"
          ? entries[0].borderBoxSize
          : entries[0].devicePixelContentBoxSize;

    width.value = boxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
    height.value = boxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
  };

  // ensure ResizeObserver is only called before/on mount to support server side rendering
  onBeforeMount(() => {
    const observer = new ResizeObserver(callback);

    if (target) {
      watch(
        target,
        (newTarget, oldTarget) => {
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
    } else {
      observer.observe(document.documentElement, { box });
    }

    onBeforeUnmount(() => observer.disconnect());
  });

  return { width, height };
};
