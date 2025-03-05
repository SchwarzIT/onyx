import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxInfoCard from "./OnyxInfoCard.vue";

const meta: Meta<typeof OnyxInfoCard> = {
  title: "Basic/InfoCard",
  tags: ["new:component"],
  component: OnyxInfoCard,
  argTypes: {
    icon: defineIconSelectArgType(),
    buttons: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxInfoCard>;

export const Default = {
  args: {
    style: "width: 24rem;",
    headline: "Example headline",
    default:
      "Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed. Id non adipiscing duis felis volutpat.",
  },
} satisfies Story;

export const Closable = {
  args: {
    ...Default.args,
    closable: true,
  },
} satisfies Story;

export const WithButtons = {
  args: {
    ...Default.args,
    buttons: [
      h(OnyxButton, { label: "Button", color: "neutral" }),
      h(OnyxButton, { label: "Button", color: "neutral" }),
    ],
  },
} satisfies Story;

export const Minimal = {
  args: {
    style: Default.args.style,
    headline: Default.args.headline,
    icon: false,
  },
} satisfies Story;
