import { onBeforeUnmount, ref, watch, type Ref } from "vue";

export type UseResizeObserverOptions = {
  /**
   * Sets which box model the observer will observe changes to.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions;
};

export const useResizeObserver = (
  target: Ref<HTMLElement | undefined>,
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

  const observer = new ResizeObserver(callback);

  watch(target, (newTarget, oldTarget) => {
    if (oldTarget) observer?.unobserve(oldTarget);
    if (newTarget) observer?.observe(newTarget, { box });
  });

  onBeforeUnmount(() => observer.disconnect());

  return { width, height };
};
