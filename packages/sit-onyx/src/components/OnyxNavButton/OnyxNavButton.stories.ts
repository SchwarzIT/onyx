import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxNavButton from "./OnyxNavButton.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";

const meta: Meta<typeof OnyxNavButton> = {
  title: "support/NavButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavButton,
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
type Story = StoryObj<typeof OnyxNavButton>;

export const Default = {
  args: {
    label: "Nav Button",
    default: () => "Nav Item",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

export const WithChildren = {
  args: {
    ...Default.args,
    active: true,
    // children: () =>
    //   [
    //     { label: "Nested Item 1", href: "#", active: true },
    //     { label: "Nested Item 2", href: "https://onyx.schwarz" },
    //     { label: "Nested Item 3", href: "#3" },
    //     { label: "Nested Item 4", href: "#4" },
    //     { label: "Nested Item 5", href: "#5" },
    //   ].map((option) =>
    //     h(
    //       OnyxListItem,
    //       h("a", { href: option.href }, () => option.label),
    //     ),
    //   ),
    children: () => listAnimals.map(({ label }) => h(OnyxListItem, label)),
  },
} satisfies Story;
