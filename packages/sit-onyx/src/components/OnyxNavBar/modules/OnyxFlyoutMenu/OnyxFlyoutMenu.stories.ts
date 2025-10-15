import { iconDisc, iconEdit, iconGlobe, iconPlaceholder, iconTrash } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import OnyxFlyoutMenu from "./OnyxFlyoutMenu.vue";

/**
 * The flyout menu is used to build up navigation menus such as the [OnyxNavItem](/docs/navigation-navbar-modules-navitem--docs) or [OnyxUserMenu](/docs/navigation-navbar-modules-usermenu--docs).
 *
 * You can also use it to e.g. build custom nav modules like action buttons for your application. The flyout menu will then take care of basic styles and keyboard navigation.
 *
 * The default `OnyxSystemButton` of the `button` slot can be replaced with a custom button.
 * If you do, you **must** bind the `trigger` [slot prop](https://vuejs.org/guide/components/slots.html#scoped-slots) to the button element.
 * E.g.:
 * ```html
 * <OnyxFlyoutMenu>
 *    <!-- Passing slot props from the button slot to the custom button -->
 *    <template #button="{ trigger }">
 *      <MyCustomButton
 *        v-bind="trigger"
 *      />
 *    </template>
 * </OnyxFlyoutMenu>
 * ```
 */
const meta: Meta<typeof OnyxFlyoutMenu> = {
  title: "Basic/FlyoutMenu",
  component: OnyxFlyoutMenu,
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="height: 10rem;">
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
    label: "Choose an action",
    options: () => [
      h(OnyxMenuItem, () => [h(OnyxIcon, { icon: iconEdit }), "Edit"]),
      h(OnyxMenuItem, () => [h(OnyxIcon, { icon: iconDisc }), "Save"]),
      h(OnyxMenuItem, () => [h(OnyxIcon, { icon: iconTrash }), "Discard"]),
    ],
  },
} satisfies Story;

export const CustomButton = {
  args: {
    label: "Choose application language",
    button: ({ trigger }) => [
      h(OnyxButton, {
        label: "English",
        mode: "plain",
        color: "neutral",
        icon: iconGlobe,
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
        icon: iconPlaceholder,
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
