import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxColorSchemeMenuItem from "./OnyxColorSchemeMenuItem.vue";

/**
 * Pre-built menu item for the `OnyxUserMenu` that can be used inside the nav bar to
 * display the current color scheme to the user and allow changing it by displaying a [OnyxColorSchemeDialog](/docs/navigation-modules-colorschemedialog--docs).
 */
const meta: Meta<typeof OnyxColorSchemeMenuItem> = {
  title: "Navigation/modules/ColorSchemeMenuItem",
  component: OnyxColorSchemeMenuItem,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxColorSchemeMenuItem>;

export const Default = {
  args: {
    modelValue: "auto",
  },
} satisfies Story;
