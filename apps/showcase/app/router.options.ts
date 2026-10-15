import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior: createOnyxScrollBehavior({
    // TODO: remove this once tabs support proper SSR: https://github.com/SchwarzIT/onyx/issues/6106
    onBeforeScroll: async (scrollContainer) => {
      const hasTabs = scrollContainer.querySelector(".onyx-tabs");
      if (!hasTabs) return;

      // if the page contains tabs (such as our component detail pages), we need to wait for the tab content to be actually visible before scrolling
      // since the OnyxTabs do currently not support SSR

      await waitForElement(".onyx-tabs__header + .onyx-tab__panel:not(:empty)");
    },
  }),
};

/**
 * Waits the for a specific selector to resolve to an element. Does not exceed the given timeout to
 * prevent infinity waiting.
 */
async function waitForElement(selector: string, timeout = 500): Promise<Element | null> {
  return new Promise((resolve) => {
    const existing = document.querySelector(selector);
    if (existing) return resolve(existing);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        clearTimeout(timer);
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const timer = setTimeout(() => {
      observer.disconnect();
      resolve(document.querySelector(selector));
    }, timeout);
  });
}
