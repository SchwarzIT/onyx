import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxLink from "./OnyxLink.vue";

/**
 * Links are navigational elements that direct users to other pages, whether they are internal or external.
 */
const meta: Meta<typeof OnyxLink> = {
  title: "Navigation/Link",
  component: OnyxLink,
  argTypes: {
    default: {
      control: { type: "text" },
    },
    withExternalIcon: {
      options: ["auto", true, false],
      control: { type: "radio" },
    },
    ...withNativeEventLogging(["onClick"]),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
      <div class="onyx-text" style="font-family: var(--onyx-font-family);">
        <story />
      </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxLink>;

/**
 * A default link that opens the page in the same tab.
 */
export const Default = {
  args: {
    default: "Click me",
    href: "https://onyx.schwarz",
  },
} satisfies Story;

/**
 * A link that opens the page in a new tab.
 */
export const NewTab = {
  args: {
    ...Default.args,
    target: "_blank",
  },
} satisfies Story;

/**
 * Link without the external icon.
 * For relative/internal links or protocols like mailto:, tel: etc. you don't need to disable
 * the `withExternalIcon` property manually, you can leave it on "auto" and the icon will
 * be hidden automatically.
 */
export const WithoutExternalIcon = {
  args: {
    ...Default.args,
    withExternalIcon: false,
  },
} satisfies Story;
