import globe from "@sit-onyx/icons/globe.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";

/**
 * The flyout menu is used to build up navigation menus such as the [OnyxNavItem](/docs/navigation-navbar-modules-navitem--docs) or [OnyxUserMenu](/docs/navigation-navbar-modules-usermenu--docs).
 *
 * You can also use it to e.g. build custom nav modules like action buttons for your application. The flyout menu will then take care of basic styles and keyboard navigation.
 */
const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "Basic/FlyoutMenu",
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
    button: ({ trigger }) => [
      h(OnyxButton, {
        label: "English",
        mode: "plain",
        color: "neutral",
        icon: globe,
        ...trigger,
      }),
    ],
    options: () => [
      h(OnyxMenuItem, { active: true }, () => "English"),
      h(OnyxMenuItem, () => "German"),
      h(OnyxMenuItem, () => "Spanish"),
    ],
  },
} satisfies Story;

export const Nested = {
  args: {
    label: "Choose an item",
    trigger: "click",
    button: ({ trigger }) => [
      h(OnyxButton, {
        label: "Example",
        mode: "plain",
        color: "neutral",
        icon: placeholder,
        ...trigger,
      }),
    ],

    options: () => [
      h(
        OnyxMenuItem,
        { label: "Item 1" },
        {
          children: () => [
            h(
              OnyxMenuItem,
              { label: "Item 1.1" },
              {
                children: () => [
                  h(OnyxMenuItem, { label: "Nested 1.1.1" }),
                  h(OnyxMenuItem, { label: "Nested 1.1.2" }),
                ],
              },
            ),
            h(
              OnyxMenuItem,
              { label: "Item 1.2" },
              {
                children: () => [
                  h(OnyxMenuItem, { label: "Nested 1.2.1" }),
                  h(OnyxMenuItem, { label: "Nested 1.2.2" }),
                ],
              },
            ),
            h(OnyxMenuItem, { label: "Item 1.3" }),
          ],
        },
      ),
      h(OnyxMenuItem, () => "Item 2"),
      h(OnyxMenuItem, () => "Item 3"),
    ],
  },
} satisfies Story;
