import { flagDE, flagGB } from "@sit-onyx/flags";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxLanguageMenuItem from "./OnyxLanguageMenuItem.vue";

/**
 * Pre-built menu item for the `OnyxUserMenu` that can be used inside the nav bar to
 * display the current application language to the user and allow changing it by displaying a [OnyxSelectDialog](/docs/support-selectdialog--docs).
 *
 * ### Keyboard support
 *
 * - Arrow up/down: Select previous/next option
 * - Enter: Confirm selected option
 * - Tab: Shift focus between options and cancel/apply button
 */
const meta: Meta<typeof OnyxLanguageMenuItem> = {
  title: "Navigation/NavBar/modules/LanguageMenuItem",
  component: OnyxLanguageMenuItem,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxLanguageMenuItem>;

export const Default = {
  args: {
    modelValue: "en-US",
    options: [
      { value: "en-US", label: "English", icon: flagGB },
      { value: "de-DE", label: "Deutsch", icon: flagDE },
    ],
  },
} satisfies Story;
