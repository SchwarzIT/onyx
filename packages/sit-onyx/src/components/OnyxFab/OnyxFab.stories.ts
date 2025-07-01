import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxFabItem from "../OnyxFabItem/OnyxFabItem.vue";
import OnyxFab from "./OnyxFab.vue";

const meta: Meta<typeof OnyxFab> = {
  title: "Buttons/FloatingActionButton",
  component: OnyxFab,
  tags: ["new:component"],
  argTypes: {
    options: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFab>;

export const Default = {
  args: {
    label: "Example label",
  },
} satisfies Story;

export const Icon = {
  args: {
    ...Default.args,
    icon: placeholder,
  },
} satisfies Story;

export const Options = {
  args: {
    label: "Example label",
    options: () => [
      h(OnyxFabItem, { label: "Action 1", icon: placeholder }),
      h(OnyxFabItem, { label: "Action 2" }),
      h(OnyxFabItem, { label: "Action 3", hideLabel: true, icon: placeholder }),
    ],
  },
} satisfies Story;
