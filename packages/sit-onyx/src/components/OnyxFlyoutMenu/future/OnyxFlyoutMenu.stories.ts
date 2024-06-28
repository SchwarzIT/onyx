import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import OnyxNavItem from "../../OnyxNavItem/future/OnyxNavItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";

const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "future/FlyoutMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyoutMenu,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `
        <div style="height: 28rem;">
          <story />
        </div>`,
      }),
    ],
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
    default: () => h(OnyxButton, { label: "Hover me" }),
    options: () => listAnimals.map(({ label }) => h(OnyxNavItem, label)),
  },
} satisfies Story;
