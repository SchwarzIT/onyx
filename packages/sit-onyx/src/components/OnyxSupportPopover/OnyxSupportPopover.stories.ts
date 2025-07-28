import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxSupportPopover from "./OnyxSupportPopover.vue";

const meta: Meta<typeof OnyxSupportPopover> = {
  title: "Support/SupportPopover",
  component: OnyxSupportPopover,
  tags: ["new:component"],
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="height: 28rem; padding: 6rem 12rem;">
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxSupportPopover>;

export const Default = {
  args: {
    label: "Example popover",
    trigger: ({ trigger }) => h(OnyxButton, { ...trigger, label: "Trigger" }),
    default: () =>
      h(
        "div",
        { style: "background-color: var(--onyx-color-base-info-200); white-space:pre-line;" },
        "This is example content\nfor the\npopover...",
      ),
  },
} satisfies Story;
