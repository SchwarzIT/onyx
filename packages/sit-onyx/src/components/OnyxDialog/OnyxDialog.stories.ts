import type { Meta } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxDialog from "./OnyxDialog.vue";

/**
 * The Dialog is used to provide information to the user.
 * It always needs a parent to align with.
 *
 * You can also implement a custom dialog using the [OnyxBasicDialog](/docs/support-dialog--docs) component.
 */
const meta: Meta<typeof OnyxDialog> = {
  title: "Feedback/Dialog",
  component: OnyxDialog,
  argTypes: {
    default: { control: { disable: true } },
    headline: { control: { disable: true } },
    footer: { control: { disable: true } },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="height: 30rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;

export const Default = createAdvancedStoryExample("OnyxDialog", "DefaultExample");
