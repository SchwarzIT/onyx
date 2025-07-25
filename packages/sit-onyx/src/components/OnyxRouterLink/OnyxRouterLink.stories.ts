import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { provide, ref } from "vue";
import { ROUTER_INJECTION_KEY } from "../../composables/useLink.js";
import OnyxRouterLink from "./OnyxRouterLink.vue";

/**
 * The router link is a unstyled support component that should be used instead of `<a>` elements.
 * It will behave identical to `<a>` but integrates the [Vue Router](https://router.vuejs.org/) if passed
 * to `createOnyx()`, see our [documentation](https://onyx.schwarz/development/router.html).
 *
 * You can also use this behavior without the router link component by using the `useLink()` composable.
 *
 * #### Example
 *
 * ```ts
 * import { createRouter } from "vue-router";
 * import { createOnyx } from "sit-onyx";
 *
 * const router = createRouter({
 *    // configure your Vue Router...
 *  });
 * const onyx = createOnyx({ router });
 *
 * app.use(router).use(onyx);
 * ```
 */
const meta: Meta<typeof OnyxRouterLink> = {
  title: "Support/RouterLink",
  component: OnyxRouterLink,
  decorators: [
    (story) => ({
      components: { story },
      setup: () => {
        provide(ROUTER_INJECTION_KEY, {
          currentRoute: ref("/"),
          push: (to) => {
            alert(`This navigation to "${to}" will be done by the projects router.`);
          },
        });
      },
      template: `<story />`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxRouterLink>;

export const Default = {
  args: {
    default: "Internal link",
    href: "/some-page",
  },
} satisfies Story;

export const ExternalLink = {
  args: {
    default: "External link",
    href: "https://example.com",
  },
} satisfies Story;
