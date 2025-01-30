import type { Meta, StoryObj } from "@storybook/vue3";
import { provide } from "vue";
import { ROUTER_INJECTION_KEY } from "../../composables/useLink";
import OnyxRouterLink from "./OnyxRouterLink.vue";

/**
 * The router link is a unstyled support component that should be used instead of `<a>` elements.
 * It will behave identical to `<a>` but integrates the [Vue Router](https://router.vuejs.org/) if passed
 * to `createOnyx()`, see our [getting started guide](https://onyx.schwarz/development/).
 *
 * You can also use this behavior without the router link component by using the `useLink()` composable.
 */
const meta: Meta<typeof OnyxRouterLink> = {
  title: "Support/RouterLink",
  component: OnyxRouterLink,
  decorators: [
    (story) => ({
      components: { story },
      setup: () => {
        provide(ROUTER_INJECTION_KEY, {
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
