import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watchEffect } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";

/**
 * Pre-built dialog where the user can select which color scheme (light/dark mode or auto) to use for the application.
 *
 * For recommended usage, please visit our [theming docs](https://onyx.schwarz/development/theming.html).
 */
const meta: Meta<typeof OnyxColorSchemeDialog> = {
  title: "support/ColorSchemeDialog",
  ...defineStorybookActionsAndVModels({
    component: OnyxColorSchemeDialog,
    events: ["update:modelValue", "close"],
    decorators: [
      (story, ctx) => ({
        components: { story, OnyxButton },
        setup: () => {
          const isOpen = ref(false);
          watchEffect(() => {
            ctx.args.open = isOpen.value;
          });
          return { isOpen };
        },
        template: `<div>
          <OnyxButton label="Show dialog" @click="isOpen = true" />
          <story :open="isOpen" @close="isOpen = false;" />
        </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxColorSchemeDialog>;

export const Default = {
  args: {
    modelValue: "auto",
  },
} satisfies Story;
