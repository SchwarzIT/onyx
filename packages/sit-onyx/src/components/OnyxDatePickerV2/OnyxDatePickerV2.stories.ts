import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
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
      template: `<div style="max-width: 24rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    modelValue: { control: { type: "date" } },
    viewMonth: { control: { type: "date" } },
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
  },
} satisfies Story;

export const MinAndMaxDate = {
  args: {
    label: "With min. and max. date",
    min: getRelativeDate(-3),
    max: getRelativeDate(3),
  },
} satisfies Story;

export const DisabledDays = {
  args: {
    ...Default.args,
    disabledDays: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
    message: "Weekends are disabled",
  },
} satisfies Story;

export const Slots = {
  args: {
    ...Default.args,
    leading: () =>
      h("span", { style: "padding-inline: var(--onyx-form-element-v2-padding-inline)" }, "Leading"),
    trailing: () =>
      h(
        "span",
        { style: "padding-inline: var(--onyx-form-element-v2-padding-inline)" },
        "Trailing",
      ),
    leadingIcons: () => h(OnyxIcon, { icon: iconPlaceholder }),
    trailingIcons: () => h(OnyxIcon, { icon: iconPlaceholder }),
    bottomRight: () => h("span", {}, "Bottom right"),
  },
} satisfies Story;

function getRelativeDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date;
}
