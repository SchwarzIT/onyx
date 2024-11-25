import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDatePicker from "./OnyxDatePicker.vue";

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
  },
};

export default meta;
type Story = StoryObj<typeof OnyxDatePicker>;

export const Date = {
  args: {
    label: "Date",
  },
} satisfies Story;

export const Datetime = {
  args: {
    label: "Date + time",
    type: "datetime",
  },
} satisfies Story;
