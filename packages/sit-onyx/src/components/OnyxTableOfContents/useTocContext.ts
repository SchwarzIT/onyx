import {
  computed,
  inject,
  onBeforeUnmount,
  toValue,
  watch,
  type InjectionKey,
  type Ref,
  type ShallowRef,
} from "vue";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver.js";
import { type VueTemplateRefElement } from "../../composables/useResizeObserver.js";

export const TOC_CONTEXT_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * Set of currently visible hashes inside the page content (e.g. headlines).
   */
  visibleHashes: Set<string>;
  /**
   * Hashes of items actually used inside the TOC.
   * Used to "ignore" any irrelevant hashes that are not part of the TOC.
   */
  tocItems: Set<string>;
}>;

export type UseTocVisibilityOptions = {
  /**
   * Hash (without leading #).
   */
  hash: Ref<string | undefined>;
  /**
   * Template ref to the component (e.g. headline).
   */
  templateRef: Readonly<ShallowRef<VueTemplateRefElement>>;
};

export const useTocVisibility = (options: UseTocVisibilityOptions) => {
  const context = inject(TOC_CONTEXT_INJECTION_KEY, undefined);
  const { isIntersecting } = useIntersectionObserver(options.templateRef);

  watch(isIntersecting, (isVisible) => {
    const hash = toValue(options.hash);
    if (!hash) return;
    if (isVisible) context?.visibleHashes.add(hash);
    else context?.visibleHashes.delete(hash);
  });

  // remove old values when hash changes
  watch(options.hash, (newHash, oldHash) => {
    if (oldHash) context?.visibleHashes.delete(oldHash);
    if (newHash) context?.visibleHashes.add(newHash);
  });

  onBeforeUnmount(() => {
    const hash = options.hash.value;
    if (hash) context?.visibleHashes.delete(hash);
  });
};

export type UseTocContextOptions = {
  /**
   * Link / hash of the TOC item (including leading #).
   */
  href: Ref<string>;
};

export const useTocContext = (options: UseTocContextOptions) => {
  const context = inject(TOC_CONTEXT_INJECTION_KEY, undefined);
  const hash = computed(() => getHashFromHref(options.href.value));

  watch(
    hash,
    (newHash, oldHash) => {
      if (oldHash) context?.tocItems.delete(oldHash);
      if (newHash) context?.tocItems.add(newHash);
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    if (hash.value) context?.tocItems.delete(hash.value);
  });

  /**
   * List of all currently visible hashes in the page content that are also included in the TOC.
   */
  const visibleHashes = computed(() => {
    return Array.from(context?.visibleHashes.values() ?? []).filter((hash) =>
      context?.tocItems.has(hash),
    );
  });

  const firstVisibleHash = computed<string | undefined>((previousValue) => {
    if (visibleHashes.value.length === 1) return visibleHashes.value[0];

    // to support cases where e.g. a headline is visible, then becomes hidden because the content below it
    // is very long but there is no new headline visible yet, the previous headline
    // should still be marked as visible in the TOC
    if (visibleHashes.value.length === 0) return previousValue;

    // if there are multiple hashes visible, we need to determine the "visual order" inside the page content
    const hashPositions = visibleHashes.value
      .map((hash) => {
        let top = Number.MAX_SAFE_INTEGER;

        try {
          const element = document.getElementById(hash);
          if (element) top = element.getBoundingClientRect().top;
        } catch {
          // noop
        }

        return { hash, top };
      })
      .sort((a, b) => a.top - b.top);

    return hashPositions[0]?.hash;
  });

  const isVisible = computed(() => hash.value && hash.value === firstVisibleHash.value);

  return { isVisible };
};

function getHashFromHref(href?: string) {
  if (!href?.startsWith("#")) return undefined;
  return href.substring(1);
}
