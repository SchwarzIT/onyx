import type { Meta } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook.js";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";

const meta: Meta<typeof OnyxSystemButton> = {
  title: "Buttons/SystemButton/Examples",
  component: OnyxSystemButton,
  tags: ["!autodocs"],
};

export default meta;

export const FlyoutMenu = createAdvancedStoryExample("OnyxSystemButton", "FlyoutMenuExample");

export const Tooltip = createAdvancedStoryExample("OnyxSystemButton", "TooltipExample");
