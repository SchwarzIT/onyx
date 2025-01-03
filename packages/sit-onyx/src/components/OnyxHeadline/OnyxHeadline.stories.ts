import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxHeadline from "./OnyxHeadline.vue";

/**
 * Headline that can e.g. be used to structure the page content.
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
      template: '<div class="onyx-grid-container"> <story /> </div>',
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
