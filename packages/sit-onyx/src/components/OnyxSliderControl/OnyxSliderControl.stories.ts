import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSliderControl from "./OnyxSliderControl.vue";

/**
 * The slider control component intended to be used alongside the OnyxSlider component to provide additional controls for adjusting the slider value.
 */
const meta: Meta<typeof OnyxSliderControl> = {
  title: "Support/SliderControl",
  component: OnyxSliderControl as Meta["component"],
  tags: ["unstable"],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    ...withNativeEventLogging(["onChange"]),
  },
};

export default meta;

export const Value = {
  args: {
    control: "value",
    modelValue: 0,
  },
} satisfies StoryObj<typeof OnyxSliderControl>;

export const IconDecrease = {
  args: {
    control: "icon",
    direction: "decrease",
  },
} satisfies StoryObj<typeof OnyxSliderControl>;

export const IconIncrease = {
  args: {
    control: "icon",
    direction: "increase",
  },
} satisfies StoryObj<typeof OnyxSliderControl>;

export const Input = {
  args: {
    control: "input",
    modelValue: 0,
  },
} satisfies StoryObj<typeof OnyxSliderControl>;
