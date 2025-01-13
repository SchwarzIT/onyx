import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxCard from "./OnyxCard.vue";

const meta: Meta<typeof OnyxCard> = {
  title: "Basic/Card",
  component: OnyxCard,
  argTypes: {
    style: { table: { disable: true } },
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCard>;

export const Default = {
  args: {
    style: "width: 20rem;",
    default: h(
      "span",
      { style: "color: var(--onyx-color-text-icons-info-intense);" },
      "Note: The card component is fully flexible. It can be adjusted with every content the project needs.",
    ),
  },
} satisfies Story;

export const Clickable = {
  argTypes: {
    ...withNativeEventLogging(["onClick"]),
  },
  args: {
    ...Default.args,
    clickable: true,
  },
} satisfies Story;
