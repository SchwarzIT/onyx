import { ref, unref, watchEffect, type Directive, type MaybeRef, type Ref } from "vue";

export type UseScrollEndOptions = {
  /**
   * Whether currently loading. Will not call the callback if `true`.
   */
  loading: Ref<boolean | undefined>;
  /**
   * Whether scroll events should be captured.
   * Should be disabled if not needed to improve performance.
   */
  enabled: Ref<boolean>;
  /**
   * Offset (in pixel). Can be used to trigger the callback earlier (e.g. if scrolled to second last option).
   */
  offset?: MaybeRef<number | undefined>;
};

/**
 * Directive used for lazy loading which will call the given function if scrolled to the end of the component.
 */
export const useScrollEnd = (options: UseScrollEndOptions) => {
  /**
   * We have to check if the scroll amount is close enough to some threshold in order to
   * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
   * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
   */
  const ARRIVED_STATE_THRESHOLD_PIXELS = 1 as const;

  const isScrollEnd = ref(false);

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
        if (options.enabled.value && !options.loading.value) {
          el.addEventListener("scroll", handleScroll);
        } else {
          el.removeEventListener("scroll", handleScroll);
        }
      });
    },
  } satisfies Directive<HTMLElement, undefined>;

  return { vScrollEnd, isScrollEnd };
};
