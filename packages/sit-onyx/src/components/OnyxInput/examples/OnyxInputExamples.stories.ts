import type { Meta } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../../utils/storybook.js";
import OnyxInput from "../OnyxInput.vue";

const meta: Meta<typeof OnyxInput> = {
  title: "Form Elements/Input/Examples",
  component: OnyxInput,
  tags: ["!autodocs"],
};

export default meta;

export const MangePassword = createAdvancedStoryExample("OnyxInput", "PasswordVisibilityExample");
