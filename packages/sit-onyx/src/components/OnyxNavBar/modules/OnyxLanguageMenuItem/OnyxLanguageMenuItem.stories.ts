import DE from "@sit-onyx/flags/DE.svg?raw";
import GB from "@sit-onyx/flags/GB.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
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
  title: "Navigation/modules/LanguageMenuItem",
  component: OnyxLanguageMenuItem,
  tags: ["new:component"],
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
      { value: "en-US", label: "English", icon: GB },
      { value: "de-DE", label: "Deutsch", icon: DE },
    ],
  },
} satisfies Story;
