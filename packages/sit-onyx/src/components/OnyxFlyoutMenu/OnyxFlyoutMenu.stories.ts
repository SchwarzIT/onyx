import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";
import { h } from "vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";

const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "support/FlyoutMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyoutMenu,
    events: [],
  }),
};

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

export default meta;
type Story = StoryObj<typeof OnyxFlyoutMenu>;

/**
 * This example shows a basic OnyxFlyoutMenu
 */
export const Default = {
  args: {
    default: () =>
      h(
        "div",
        { style: { display: "contents" } },
        listAnimals.map(({ label }) => h(OnyxListItem, label)),
      ),
  },
} satisfies Story;
