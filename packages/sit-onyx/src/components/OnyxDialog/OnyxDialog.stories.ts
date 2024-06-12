import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDialog from "./OnyxDialog.vue";

/**
 * Dialogs can be used to overlay the primary page content (or other dialogs).
 * If using the `modal` mode, the primary page content will not be interactive.
 */
const meta: Meta<typeof OnyxDialog> = {
  title: "components/Dialog",
  ...defineStorybookActionsAndVModels({
    component: OnyxDialog,
    events: ["close"],
    argTypes: {
      default: { control: { type: "text" } },
    },
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="height: 12rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxDialog>;

export const Default = {
  args: {
    label: "Example dialog",
    open: true,
    default: "Dialog content...",
  },
} satisfies Story;
