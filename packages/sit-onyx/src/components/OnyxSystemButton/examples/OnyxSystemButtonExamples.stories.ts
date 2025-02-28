import type { Meta } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";

const meta: Meta<typeof OnyxSystemButton> = {
  title: "Buttons/SystemButton/Examples",
  component: OnyxSystemButton,
  tags: ["!autodocs"],
};

export default meta;

export const FlyoutMenu = await createAdvancedStoryExample("OnyxSystemButton", "FlyoutMenuExample");

export const Tooltip = await createAdvancedStoryExample("OnyxSystemButton", "TooltipExample");
