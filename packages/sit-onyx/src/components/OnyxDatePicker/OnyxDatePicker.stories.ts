import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxDatePicker from "./OnyxDatePicker.vue";

/**
 * The DatePicker component can be used to select a date or date + time.
 *
 * **Note: For now, the calendar flyout will use the native browser calendar. This will be replaced with a custom and more advanced implementation in the future.**
 */
const meta: Meta<typeof OnyxDatePicker> = {
  title: "Form Elements/DatePicker",
  component: OnyxDatePicker,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    ...withNativeEventLogging(["onInput", "onChange", "onFocusin", "onFocusout"]),
    modelValue: { control: { type: "text" } },
    min: { control: { type: "date" } },
    max: { control: { type: "date" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxDatePicker>;

export const Default = {
  args: {
    label: "Date",
  },
} satisfies Story;

export const Datetime = {
  args: {
    label: "Date + time",
    type: "datetime-local",
  },
} satisfies Story;

export const MinAndMaxDate = {
  args: {
    label: "With min. and max. date",
    type: "datetime-local",
    min: getRelativeDate(-3),
    max: getRelativeDate(3),
  },
} satisfies Story;

function getRelativeDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date;
}
