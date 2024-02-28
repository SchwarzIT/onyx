import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxLink from "./OnyxLink.vue";

/**
 * Links are a navigational elements that direct users to other pages, whether they are internal or external.
 */
const meta: Meta<typeof OnyxLink> = {
  title: "components/OnyxLink",
  ...defineStorybookActionsAndVModels({
    component: OnyxLink,
    events: ["click"],
    argTypes: {
      default: {
        control: { disabled: true },
      },
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
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxLink>;

/**
 * A default link that opens the page in the same tab.
 */
export const Default = {
  args: {
    default: () => "Click me",
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
 * By default external links that point to another website will show an icon.
 * If you use internal links that point to the same website, the icon will be hidden.
 */
export const InternalLink = {
  args: {
    default: () => "Click me",
    href: "#",
  },
} satisfies Story;
