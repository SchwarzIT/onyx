import { readonly, ref, unref, watchEffect, type Directive, type MaybeRef, type Ref } from "vue";

export type UseScrollEndOptions = {
  /**
   * Whether the scroll container is currently loading. Will pause scroll listeners if `true`.
   */
  loading: Ref<boolean | undefined>;
  /**
   * Whether scroll events should be captured.
   * Can be disabled if lazy loading is not needed to improve performance.
   *
   * @default true
   */
  enabled?: Ref<boolean>;
  /**
   * Offset (in pixel). Can be used to trigger the callback earlier (e.g. if scrolled to second last option).
   * Must be >= 0.
   */
  offset?: MaybeRef<number | undefined>;
};

/**
 * Directive used for lazy loading which will keep track of whether the component is scrolled to the end (vertically).
 */
export const useScrollEnd = (options: UseScrollEndOptions) => {
  /**
   * We have to check if the scroll amount is close enough to some threshold in order to
   * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
   * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
   */
  const ARRIVED_STATE_THRESHOLD_PIXELS = 1 as const;

  /**
   * Whether the component is scrolled to the end (vertically).
   */
  const isScrollEnd = ref(false);

  /**
   * Updates the isScrollEnd depending on the event targets scroll position.
   */
  const handleScroll = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const offset = unref(options.offset) ?? 0;

    isScrollEnd.value =
      Math.abs(target.scrollTop) + target.clientHeight >=
      target.scrollHeight - offset - ARRIVED_STATE_THRESHOLD_PIXELS;
  };

  const vScrollEnd = {
    mounted: (el) => {
      watchEffect(() => {
        const isEnabled = options.enabled?.value ?? true;

        if (isEnabled && !options.loading.value) {
          el.addEventListener("scroll", handleScroll);
        } else {
          el.removeEventListener("scroll", handleScroll);
        }
      });
    },
  } satisfies Directive<Pick<HTMLElement, "addEventListener" | "removeEventListener">, undefined>;

  return { vScrollEnd, isScrollEnd: readonly(isScrollEnd) };
};
