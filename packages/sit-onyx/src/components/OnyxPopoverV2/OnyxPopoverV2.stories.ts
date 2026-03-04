import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxPopoverV2 from "./OnyxPopoverV2.vue";

const meta: Meta<typeof OnyxPopoverV2> = {
  title: "Support/PopoverV2",
  component: OnyxPopoverV2,
  tags: ["unstable"],
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="padding: 6rem 12rem; font-family: var(--onyx-font-family-paragraph); color: var(--onyx-color-text-icons-neutral-intense)">
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxPopoverV2>;

export const Default = { args: {} } satisfies Story;
