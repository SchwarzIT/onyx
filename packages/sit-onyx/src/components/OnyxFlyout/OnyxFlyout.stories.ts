import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxFlyout from "./OnyxFlyout.vue";

/**
 * The Flyout component is a supportive element for Menus, designed to display a popover above the main page content.
 * It remains anchored to the default content, providing additional options or information.
 */

const meta: Meta<typeof OnyxFlyout> = {
  title: "Support/Flyout",
  component: OnyxFlyout,
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="height: 28rem; padding: 6rem 12rem;">
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
type Story = StoryObj<typeof OnyxFlyout>;

/**
 * This example shows a basic OnyxFlyoutMenu
 */
export const Default = {
  args: {
    label: "Choose application language",
    default: ({ trigger }) => [
      h(OnyxButton, { label: "Trigger", mode: "plain", color: "neutral", ...trigger }),
    ],
    content: () => "Content",
  },
} satisfies Story;
