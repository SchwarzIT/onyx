import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDatePickerV2 from "./OnyxDatePickerV2.vue";

/**
 * The DatePicker component can be used to select a date, multiple dates or a range of dates.
 */
const meta: Meta<typeof OnyxDatePickerV2> = {
  title: "Form Elements/DatePickerV2",
  tags: ["unstable"],
  component: OnyxDatePickerV2,
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
    fitParent: true,
  },
} satisfies Story;

export const Multiple = {
  args: {
    label: "Date",
    selectionMode: "multiple",
    fitParent: true,
  },
} satisfies Story;

export const Range = {
  args: {
    label: "Date",
    selectionMode: "range",
    fitParent: true,
  },
} satisfies Story;

export const MultiView = {
  args: {
    label: "Date",
    selectionMode: "range",
    multiView: true,
  },
} satisfies Story;

export const BottomBar = {
  args: {
    label: "Date",
    selectionMode: "range",
    fitParent: true,
    bottomBar: () => [
      h(OnyxButton, { label: "Cancel", color: "neutral", mode: "plain" }),
      h(OnyxButton, { label: "Save" }),
    ],
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
