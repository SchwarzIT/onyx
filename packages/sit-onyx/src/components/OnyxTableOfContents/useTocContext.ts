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
   *
   * @example "section-1"
   */
  hash: Ref<string | undefined>;
  /**
   * Template ref to the component (e.g. headline).
   */
  templateRef: Readonly<ShallowRef<VueTemplateRefElement>>;
};

/**
 * Composable that should be added to components (usually the OnyxHeadline) that should report its visibility
 * to the OnyxTableOfContents so the corresponding TOC item is automatically marked active if the component (inside of the page content)
 * becomes visible.
 *
 * @example
 * ```ts
 * const headline = useTemplateRef<VueTemplateRefElement>("headline");
 * useTocVisibility({ hash: "section-1", templateRef: headline });
 * ```
 */
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
   * Link / hash of the TOC item.
   *
   * @example "#section-1"
   */
  href: Ref<string>;
};

/**
 * Composable for accessing the table of contents context (usually done by OnyxTableOfContentsItem)
 * to check whether the related component (usually OnyxHeadline) for this TOC item inside the page content
 * is currently visible to support auto active highlighting for the TOC item.
 *
 * @example
 * ```ts
 * const { isVisible } = useTocContext({ href: "#section-1" });
 * // highlight TOC item as active when "isVisible" is true...
 * ```
 */
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
        const element = document.getElementById(hash);
        if (element) top = element.getBoundingClientRect().top;
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
