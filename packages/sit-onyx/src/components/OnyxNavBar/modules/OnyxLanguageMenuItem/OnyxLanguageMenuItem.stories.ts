import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxLanguageMenuItem from "./OnyxLanguageMenuItem.vue";
import deFlag from "./de-DE.svg?raw";
import enFlag from "./en-US.svg?raw";

/**
 * Pre-built menu item for the `OnyxUserMenu` that can be used inside the nav bar to
 * display the current application language to the user and allow changing it by displaying a [OnyxSelectDialog](/docs/support-selectdialog--docs).
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
      { value: "en-US", label: "English", icon: enFlag },
      { value: "de-DE", label: "Deutsch", icon: deFlag },
    ],
  },
} satisfies Story;
