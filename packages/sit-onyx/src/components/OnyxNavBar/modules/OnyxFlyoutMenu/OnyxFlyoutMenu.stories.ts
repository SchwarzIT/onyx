import globe from "@sit-onyx/icons/globe.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
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
  component: OnyxFlyoutMenu,
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
    button: { control: { disable: true } },
    options: { control: { disable: true } },
    header: { control: { disable: true } },
    footer: { control: { disable: true } },
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFlyoutMenu>;

/**
 * This example shows a basic OnyxFlyoutMenu
 */
export const Default = {
  args: {
    label: "Choose application language",
    button: ({ trigger, disabled }) => [
      h(OnyxButton, {
        label: "English",
        mode: "plain",
        color: "neutral",
        icon: globe,
        disabled,
        ...trigger,
      }),
    ],
    options: ({ disabled }) => [
      h(OnyxMenuItem, { active: true, disabled }, () => "English"),
      h(OnyxMenuItem, { disabled }, () => "German"),
      h(OnyxMenuItem, { disabled }, () => "Spanish"),
    ],
  },
} satisfies Story;
