import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTimepicker from "./OnyxTimepicker.vue";
/**
 * The Timepicker component allows users to select a specific time.
 */

const meta: Meta<typeof OnyxTimepicker> = {
  title: "Form Elements/Timepicker",
  component: OnyxTimepicker,
};

export default meta;

type Story = StoryObj<typeof OnyxTimepicker>;

export const Default = {} satisfies Story;
