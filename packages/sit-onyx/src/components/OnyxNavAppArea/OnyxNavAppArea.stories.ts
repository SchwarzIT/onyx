import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import onyxLogo from "../OnyxNavigationBar/onyx-logo.svg";
import OnyxNavAppArea from "./OnyxNavAppArea.vue";

/**
 * App area of the `OnyxNavigationBar`. Is not intended to be used outside of the navigation bar.
 */
const meta: Meta<typeof OnyxNavAppArea> = {
  title: "support/NavAppArea",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavAppArea,
    events: ["click"],
    argTypes: {
      default: { control: { type: "text" } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavAppArea>;

export const Default = {
  args: {
    appName: "App name",
    logoUrl: onyxLogo,
  },
} satisfies Story;
