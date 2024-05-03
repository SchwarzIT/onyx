import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxList from "./OnyxList.vue";
import { h } from "vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";

const meta: Meta<typeof OnyxList> = {
  title: "support/List",
  ...defineStorybookActionsAndVModels({
    component: OnyxList,
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
type Story = StoryObj<typeof OnyxList>;

/**
 * This example shows a default single select listbox.
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
