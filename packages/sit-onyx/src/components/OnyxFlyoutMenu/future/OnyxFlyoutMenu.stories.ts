import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxListItem from "../../OnyxListItem/OnyxListItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";

const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "future/FlyoutMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyoutMenu,
    events: [],
    argTypes: {
      default: { control: { disable: true } },
      options: { control: { disable: true } },
      header: { control: { disable: true } },
      footer: { control: { disable: true } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxFlyoutMenu>;

const listAnimals = [
  { label: "Cat" },
  { label: "Dog" },
  { label: "Tiger" },
  { label: "Reindeer" },
  { label: "Racoon" },
  { label: "Dolphin" },
  { label: "Flounder" },
  { label: "Eel" },
  { label: "Falcon" },
  { label: "Owl" },
];

/**
 * This example shows a basic OnyxFlyoutMenu
 */
export const Default = {
  args: {
    default: () => h("button", "Click Me"),
    options: () => listAnimals.map(({ label }) => h(OnyxListItem, label)),
  },
} satisfies Story;
