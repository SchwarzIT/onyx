import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDatePicker from "./OnyxDatePicker.vue";

/**
 * The DatePicker component can be used to select a date or date + time.
 *
 * **Note: For now, the calendar flyout will use the native browser calendar. This will be replaced with a custom and more advanced implementation in the future.**
 */
const meta: Meta<typeof OnyxDatePicker> = {
  title: "Form Elements/DatePickerV2",
  tags: ["unstable"],
  component: OnyxDatePicker,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 20rem;"> <story /> </div>`,
    }),
  ],

  argTypes: {
    ...withNativeEventLogging(["onInput", "onChange", "onFocusin", "onFocusout"]),
    modelValue: { control: { type: "date" } },
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

export const Test = {
  ...createAdvancedStoryExample("OnyxDatePickerV2", "defaultExample"),
} satisfies Story;

export const BottomBar = {
  args: {
    label: "Date",
    selectionMode: "range",
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
