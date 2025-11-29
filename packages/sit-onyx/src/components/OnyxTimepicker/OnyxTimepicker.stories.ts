import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTimepicker from "./OnyxTimepicker.vue";
/**
 * The Timepicker component allows users to select a specific time.
 */

const meta: Meta<typeof OnyxTimepicker> = {
  title: "Form Elements/Timepicker",
  component: OnyxTimepicker,
  tags: ["unstable"],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
  args: {
    label: "Select Time",
  },
};

export default meta;

type Story = StoryObj<typeof OnyxTimepicker>;

export const Default = {} satisfies Story;
export const CustomSegments = {
  args: {
    segments: { hour: true, minute: true, second: true },
  },
} satisfies Story;

export const InfoLabel = {
  args: {
    infoLabel: "Info label",
  },
} satisfies Story;
