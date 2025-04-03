import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxDrawer from "./OnyxDrawer.vue";

/**
 * The drawer is used to temporarily display information as overlay over the application.
 * For example to build a [notification center](/story/examples-notificationcenter--default).
 */
const meta: Meta<typeof OnyxDrawer> = {
  title: "Feedback/Drawer",
  tags: ["new:component"],
  component: OnyxDrawer,
};

export default meta;
type Story = StoryObj<typeof OnyxDrawer>;

export const Default = createAdvancedStoryExample("OnyxDrawer", "DefaultExample") satisfies Story;

export const RightAligned = createAdvancedStoryExample(
  "OnyxDrawer",
  "RightAlignedExample",
) satisfies Story;
