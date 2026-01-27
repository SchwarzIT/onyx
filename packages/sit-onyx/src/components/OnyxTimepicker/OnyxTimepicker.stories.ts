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
export const WithSeconds = {
  args: {
    showSeconds: true,
  },
} satisfies Story;

export const InfoLabel = {
  args: {
    type: "select",
    infoLabel: "Info label",
  },
} satisfies Story;

export const Select = {
  args: {
    type: "select",
    min: "08:00",
    max: "17:00",
    options: {
      stepSize: 1800,
    },
  },
} satisfies Story;
export const SelectWithCustomTimes = {
  args: {
    type: "select",
    options: {
      customTimes: [
        {
          value: "09:00",
          label: "09:00",
          group: "Morning Slots (09:00 - 12:00)",
        },
        {
          value: "10:00",
          label: "10:00",
          group: "Morning Slots (09:00 - 12:00)",
          disabled: true,
        },
        {
          value: "11:00",
          label: "11:00",
          group: "Morning Slots (09:00 - 12:00)",
        },
        {
          value: "12:30",
          label: "12:30",
          disabled: true,
          group: "Lunch Break (12:00 - 14:00)",
        },
        {
          value: "14:00",
          label: "14:00",
          group: "Afternoon Slots (14:00 - 17:00)",
        },
        {
          value: "15:00",
          label: "15:00",
          group: "Afternoon Slots (14:00 - 17:00)",
          disabled: true,
        },
        {
          value: "15:30",
          label: "15:30",
          group: "Afternoon Slots (14:00 - 17:00)",
          disabled: true,
        },
        {
          value: "16:00",
          label: "16:00",
          group: "Afternoon Slots (14:00 - 17:00)",
        },
      ],
    },
  },
} satisfies Story;
