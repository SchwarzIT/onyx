import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";

/**
 * Pre-built dialog where the user can select which color scheme (light/dark mode or auto) to use for the application.
 *
 * ## Usage
 *
 * The color scheme dialog can easily be used together with [`@vueuse/core`](https://vueuse.org/core/useColorMode):
 *
 * ```html
 * <script lang="ts" setup>
 * import { useColorMode } from "@vueuse/core";
 * import { ref } from "vue";
 * import { OnyxColorSchemeDialog } from "sit-onyx";
 *
 * const { store: colorScheme } = useColorMode();
 * const isOpen = ref(true);
 * </script>
 *
 * <template>
 *    <OnyxColorSchemeDialog v-model="colorScheme" :open="isOpen" @close="isOpen = false" />
 * </template>
 * ```
 */
const meta: Meta<typeof OnyxColorSchemeDialog> = {
  title: "support/ColorSchemeDialog",
  ...defineStorybookActionsAndVModels({
    component: OnyxColorSchemeDialog,
    events: ["update:modelValue", "close"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="height: 48rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxColorSchemeDialog>;

export const Default = {
  args: {
    open: true,
    modelValue: "auto",
  },
} satisfies Story;
