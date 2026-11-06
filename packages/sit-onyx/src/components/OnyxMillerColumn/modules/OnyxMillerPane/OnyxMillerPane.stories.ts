import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxMillerItem from "../OnyxMillerItem/OnyxMillerItem.vue";
import OnyxMillerPane from "./OnyxMillerPane.vue";

const meta: Meta<typeof OnyxMillerPane> = {
  title: "Navigation/MillerColumn/modules/MillerPane",
  component: OnyxMillerPane,
  argTypes: {
    default: { control: { disable: true } },
  },
  args: {
    density: "default",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxMillerPane>;

export const Default = {
  args: {
    label: "Product Group",
    default: () => [
      h(OnyxMillerItem, { label: "Chocolate Bars", arrow: true }),
      h(OnyxMillerItem, { label: "Cookies & Biscuits", active: true, arrow: true }),
      h(OnyxMillerItem, { label: "Gummy Bears", count: 5 }),
      h(OnyxMillerItem, { label: "Chocolate Balls", dot: true, dotColor: "red" }),
    ],
  },
} satisfies Story;
