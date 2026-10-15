import type { RouterConfig } from "nuxt/schema";
import { nextTick, useNuxtApp } from "#imports";

type CreateOnyxScrollBehaviorOptions = {
  onBeforeScroll?: (
    ...params: Parameters<NonNullable<RouterConfig["scrollBehavior"]>>
  ) => Promise<void>;
};

/**
 * Creates a Vue Router scrollBehavior for applying router scroll behavior when using the onyx
 * design system. Note: The default Vue Router scroll behavior does not work because onyx uses a
 * different scroll container (.onyx-page__main) instead of the html/body element.
 *
 * Will make sure the scrolling is done after the async page is ready.
 */
export function createOnyxScrollBehavior(
  options?: CreateOnyxScrollBehaviorOptions,
): RouterConfig["scrollBehavior"] {
  return (to, from, savedPosition) => {
    const nuxtApp = useNuxtApp();

    return new Promise((resolve) => {
      // "page:finish" fires after <Suspense> resolved so the page is ready to be scrolled
      nuxtApp.hooks.hookOnce("page:finish", async () => {
        await nextTick();

        const scrollContainer = document.querySelector<HTMLElement>(".onyx-page__main");
        if (!scrollContainer) {
          resolve(false);
          return;
        }

        await options?.onBeforeScroll?.(to, from, savedPosition);

        // to avoid too much visual motion when switching pages or on initial page load when scrolling to an anchor
        // we use "instant" scroll behavior here
        const behavior: ScrollBehavior = "instant";

        // support scroll to anchors (e.g. headlines)
        const hashElement = to.hash ? scrollContainer.querySelector(to.hash) : undefined;
        if (hashElement) {
          return hashElement.scrollIntoView({ block: "start", behavior });
        }

        if (savedPosition) {
          scrollContainer.scrollTo(savedPosition);
        } else {
          scrollContainer.scrollTo({ left: 0, top: 0, behavior });
        }

        // resolve false to stop Vue Router from attempting to scroll window
        resolve(false);
      });
    });
  };
}
