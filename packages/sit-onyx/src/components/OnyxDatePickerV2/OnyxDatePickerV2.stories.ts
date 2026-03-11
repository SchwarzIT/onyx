import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxDatePickerV2 from "./OnyxDatePickerV2.vue";

/**
 * The DatePicker component can be used to select a date, multiple dates or a range of dates.
 */
const meta: Meta<typeof OnyxDatePickerV2> = {
  title: "Form Elements/DatePickerV2",
  tags: ["unstable"],
  component: OnyxDatePickerV2 as Meta["component"],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 20rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    modelValue: { control: { type: "date" } },
    min: { control: { type: "date" } },
    max: { control: { type: "date" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxDatePickerV2>;

export const Default = {
  args: {
    label: "Date",
  },
} satisfies Story;

export const Multiple = {
  args: {
    label: "Date",
    selectionMode: "multiple",
  },
} satisfies Story;

export const Range = {
  args: {
    label: "Date",
    selectionMode: "range",
  },
} satisfies Story;

export const MultiView = {
  args: {
    label: "Date",
    selectionMode: "range",
    multiView: true,
    fitParent: false,
  },
} satisfies Story;

export const MinAndMaxDate = {
  args: {
    label: "With min. and max. date",
    min: getRelativeDate(-3),
    max: getRelativeDate(3),
  },
} satisfies Story;

function getRelativeDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date;
}
