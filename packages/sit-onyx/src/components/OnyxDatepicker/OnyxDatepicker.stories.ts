import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDatepicker from "./OnyxDatepicker.vue";

const meta: Meta<typeof OnyxDatepicker> = {
  title: "Form Elements/Datepicker",
  component: OnyxDatepicker,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    ...withNativeEventLogging(["onInput", "onChange", "onFocusin", "onFocusout"]),
    min: { control: { type: "text" } },
    max: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxDatepicker>;

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
