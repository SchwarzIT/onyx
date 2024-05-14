import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";

const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "support/FlyoutMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyoutMenu,
    events: [],
    argTypes: {
      default: { control: { disable: true } },
      header: { control: { disable: true } },
      footer: { control: { disable: true } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxFlyoutMenu>;

/**
 * This example shows a basic OnyxFlyoutMenu
 */
export const Default = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxFlyoutMenu, OnyxListItem },
    template: `
      <OnyxFlyoutMenu>
        <OnyxListItem>Cat</OnyxListItem>
        <OnyxListItem>Dog</OnyxListItem>
        <OnyxListItem>Tiger</OnyxListItem>
        <OnyxListItem>Reindeer</OnyxListItem>
        <OnyxListItem>Racoon</OnyxListItem>
        <OnyxListItem>Dolphin</OnyxListItem>
        <OnyxListItem>Flounder</OnyxListItem>
        <OnyxListItem>Eel</OnyxListItem>
        <OnyxListItem>Falcon</OnyxListItem>
        <OnyxListItem>Owl</OnyxListItem>
      </OnyxFlyoutMenu>`,
  }),
} satisfies Story;
