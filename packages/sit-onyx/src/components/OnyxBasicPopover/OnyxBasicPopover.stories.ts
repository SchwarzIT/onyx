import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxBasicPopover from "./OnyxBasicPopover.vue";

/**
 * The Popover component is a supportive element for Menus, designed to display elements above the main page content.
 * It remains anchored to the default content, providing additional options or information.
 */
const meta: Meta<typeof OnyxBasicPopover> = {
  title: "Support/Popover",
  component: OnyxBasicPopover,
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
    default: { control: { disable: true } },
    content: { control: { disable: true } },
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxBasicPopover>;

/**
 * This example shows a basic OnyxBasicPopoverMenu
 */
export const Default = {
  args: {
    label: "Choose application language",
    default: ({ trigger }) => [
      h(OnyxButton, {
        label: "Trigger",
        mode: "plain",
        color: "neutral",
        ...trigger,
      }),
    ],
    content: () => "Content",
  },
} satisfies Story;
