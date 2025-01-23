import type { Meta, StoryObj } from "@storybook/vue3";
import { provide } from "vue";
import { ROUTER_INJECTION_KEY } from "../../composables/useLink";
import OnyxRouterLink from "./OnyxRouterLink.vue";

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
    default: "External link",
    href: "https://example.com",
    target: "_blank",
  },
} satisfies Story;

export const InternalLink = {
  args: {
    href: "/some-page",
    default: "Internal link",
  },
} satisfies Story;
