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
import type { SharedLinkProps } from "../OnyxRouterLink/types.js";

export const TOC_CONTEXT_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * Set of currently visible hashes (e.g. headlines).
   */
  visibleHashes: Set<string>;
  /**
   * Hashes of TOC items actually used inside the TOC.
   * Needed to "ignore" any irrelevant hashes that are not part of the TOC.
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
  if (!context) return;

  const { isIntersecting } = useIntersectionObserver(options.templateRef, {});

  watch(isIntersecting, (isVisible) => {
    const hash = toValue(options.hash);
    if (!hash) return;
    if (isVisible) context.visibleHashes.add(hash);
    else context.visibleHashes.delete(hash);
  });

  // remove old values when hash changes
  watch(options.hash, (newHash, oldHash) => {
    if (oldHash == undefined || !context.visibleHashes.has(oldHash)) return;
    if (newHash != undefined) context.visibleHashes.add(newHash);
  });

  onBeforeUnmount(() => {
    const hash = options.hash.value;
    if (hash != undefined) context.visibleHashes.delete(hash);
  });
};

export type UseTocContextOptions = {
  link: Ref<SharedLinkProps | undefined>;
};

export const useTocContext = (options: UseTocContextOptions) => {
  const context = inject(TOC_CONTEXT_INJECTION_KEY, undefined);
  const hash = computed(() => getHashFromHref(options.link.value?.href));

  watch(
    hash,
    (newHash, oldHash) => {
      if (newHash) context?.tocItems.add(newHash);
      if (oldHash) context?.tocItems.delete(oldHash);
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    if (hash.value) context?.tocItems.delete(hash.value);
  });

  const firstVisibleHash = computed<string | undefined>((previousValue) => {
    const visibleHashes = Array.from(context?.visibleHashes.values() ?? []).filter((hash) =>
      context?.tocItems.has(hash),
    );
    if (visibleHashes.length === 1) return visibleHashes[0];

    // to support cases where e.g. a headline is visible, then becomes hidden because the content below it
    // is very long but there is no new headline visible yet, the previous headline
    // should still be marked as visible in the TOC
    if (visibleHashes.length === 0) return previousValue;

    // if there are multiple hashes visible, we need to determine the order inside the DOM
    const hashPositions = visibleHashes
      .map((hash) => {
        const element = document.getElementById(hash);
        return { hash, top: element?.getBoundingClientRect().top ?? Number.MAX_SAFE_INTEGER };
      })
      .sort((a, b) => a.top - b.top);

    return hashPositions[0]?.hash;
  });

  const isVisible = computed(() => {
    return hash.value && hash.value === firstVisibleHash.value;
  });

  return { isVisible };
};

function getHashFromHref(href?: string) {
  if (!href?.startsWith("#")) return undefined;
  return href.substring(1);
}
