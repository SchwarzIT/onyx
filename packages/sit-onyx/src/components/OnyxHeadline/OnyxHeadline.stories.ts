import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxHeadline from "./OnyxHeadline.vue";

/**
 * Headlines organize and structure content, guiding the user through different sections and conveying the hierarchy of information.
 */
const meta: Meta<typeof OnyxHeadline> = {
  title: "Navigation/Headline",
  component: OnyxHeadline,
  argTypes: {
    default: {
      control: { type: "text" },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="onyx-grid-layout"> <story /> </div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxHeadline>;

/**
 * This example shows a default h1 headline.
 */
export const Default = {
  args: {
    is: "h1",
    default: "Lorem ipsum dolor sit amet",
  },
} satisfies Story;

/**
 * This example shows a default h1 headline with a hash URL that can be copied by clicking the headline.
 */
export const WithHash = {
  args: {
    is: "h1",
    default: "Click me to copy URL",
    hash: "section-1",
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
