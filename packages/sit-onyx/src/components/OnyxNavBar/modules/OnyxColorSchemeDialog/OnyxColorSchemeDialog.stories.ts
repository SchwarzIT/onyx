import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/internal/preview-api";
import { ref, watch, watchEffect } from "vue";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";
import type { OnyxColorSchemeDialogProps } from "./types.js";

/**
 * Pre-built dialog where the user can select which color scheme (light/dark mode or auto) to use for the application.
 *
 * For recommended usage, please visit our [theming docs](https://onyx.schwarz/development/theming.html).
 *
 * ### Keyboard support
 *
 * - Arrow up/down: Select previous/next option
 * - Enter: Confirm selected color scheme
 * - Tab: Shift focus between options and cancel/apply button
 */
const meta: Meta<typeof OnyxColorSchemeDialog> = {
  title: "Navigation/NavBar/modules/ColorSchemeDialog",
  component: OnyxColorSchemeDialog,
  decorators: [
    (story) => {
      const [args, updateArgs] = useArgs<OnyxColorSchemeDialogProps>();

      return {
        components: { story, OnyxButton },
        setup: () => {
          const isOpen = ref(false);

          watch(
            () => args.open,
            (newOpen) => (isOpen.value = !!newOpen),
            { immediate: true },
          );

          watchEffect(() => updateArgs({ open: isOpen.value }));
          return { isOpen };
        },
        template: `<div>
            <OnyxButton label="Show dialog" @click="isOpen = true" />
            <story v-model:open="isOpen" />
          </div>`,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxColorSchemeDialog>;

export const Default = {
  args: {
    modelValue: "auto",
  },
} satisfies Story;
