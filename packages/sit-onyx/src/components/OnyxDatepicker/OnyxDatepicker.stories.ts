import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDatepicker from "./OnyxDatepicker.vue";

const meta: Meta<typeof OnyxDatepicker> = {
  title: "Form/Datepicker",
  ...defineStorybookActionsAndVModels({
    component: OnyxDatepicker,
    events: ["update:modelValue", "change", "focus", "blur", "validityChange"],
    // argTypes: {
    //   modelValue: {
    //     control: { type: "date" },
    //   },
    // },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxDatepicker>;

export const Default = {
  args: {
    label: "Label",
  },
} satisfies Story;
