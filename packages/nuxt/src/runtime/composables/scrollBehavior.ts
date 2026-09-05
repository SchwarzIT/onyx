import type { ShallowRef } from "vue";
import { computed, toValue, useRoute, useRuntimeHook } from "#imports";

export type UseOnyxScrollBehaviorOptions = {
  /**
   * Template ref to the application's root element (typically the `<OnyxAppLayout>` component).
   */
  root: ShallowRef<Element | { $el?: Element | null } | null>;
};

/**
 * Composable for applying router scroll behavior when using the onyx design system.
 * Note: The default Vue Router scroll behavior does not work for because onyx uses
 * a different scroll container (.onyx-page__main) instead of the html/body element.
 */
export const useOnyxScrollBehavior = (options: UseOnyxScrollBehaviorOptions) => {
  const route = useRoute();
  const element = computed<Element | null>(() => {
    const root = toValue(options.root);
    if (!root) return null;
    return root instanceof Element ? root : (root.$el ?? null);
  });

  useRuntimeHook("page:finish", () => {
    const scrollContainer = element.value?.querySelector(".onyx-page__main");
    if (!scrollContainer) return;

    // to avoid too much visual motion when switching pages or on initial page load when scrolling to an anchor
    // we use "instant" scroll behavior here
    const behavior: ScrollBehavior = "instant";

    // support scroll to anchors (e.g. headlines)
    const hashElement = route.hash ? scrollContainer.querySelector(route.hash) : undefined;
    if (hashElement) {
      return hashElement.scrollIntoView({ block: "start", behavior });
    }

    scrollContainer.scrollTo({ left: 0, top: 0, behavior });
  });
};
