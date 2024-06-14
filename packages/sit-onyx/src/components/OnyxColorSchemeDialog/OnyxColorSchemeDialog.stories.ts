import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";

/**
 * Pre-built dialog where the user can select which color scheme (light/dark mode or auto) to use for the application.
 */
const meta: Meta<typeof OnyxColorSchemeDialog> = {
  title: "support/ColorSchemeDialog",
  ...defineStorybookActionsAndVModels({
    component: OnyxColorSchemeDialog,
    events: ["update:modelValue", "close"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="height: 50vh;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxColorSchemeDialog>;

export const Default = {
  args: {
    open: true,
    label: "Select color scheme",
    modelValue: "auto",
  },
} satisfies Story;
