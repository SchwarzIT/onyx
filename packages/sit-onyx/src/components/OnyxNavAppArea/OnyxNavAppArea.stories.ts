import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxNavAppArea from "./OnyxNavAppArea.vue";

/**
 * App area of the `OnyxNavBar`. Is not intended to be used outside of the nav bar.
 */
const meta: Meta<typeof OnyxNavAppArea> = {
  title: "Support/NavAppArea",
  component: OnyxNavAppArea,
  argTypes: {
    default: { control: { type: "text" } },
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNavAppArea>;

export const Default = {
  args: {
    appName: "App name",
    logoUrl: "/onyx-logo.svg",
  },
} satisfies Story;
