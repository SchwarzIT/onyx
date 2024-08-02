import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";

/**
 * The flyout menu is mainly used internally for e.g. the [nav button](/docs/navigation-modules-navbutton--docs) or [user menu](/docs/navigation-modules-usermenu--docs).
 *
 * But you can also use it to e.g. build custom nav modules like language selections for your application. The flyout menu will then take care of basic styles and keyboard navigation.
 */
const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "Navigation/modules/FlyoutMenu",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyoutMenu,
    events: ["update:open"],
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
    default: () => [h(OnyxButton, { label: "Hover me" })],
    options: () => listAnimals.map(({ label }) => h(OnyxMenuItem, () => label)),
  },
} satisfies Story;
