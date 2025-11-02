import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSliderControl from "./OnyxSliderControl.vue";

/**
 * The slider control component intended to be used alongside the OnyxSlider component to provide additional controls for adjusting the slider value.
 */
const meta: Meta<typeof OnyxSliderControl> = {
  title: "Support/OnyxSliderControl",
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

export const ValueControl = {
  args: {
    control: "value",
    value: 0,
  },
} satisfies StoryObj<typeof OnyxSliderControl>;

export const IconControlIconDecrease = {
  args: {
    control: "icon",
    direction: "decrease",
  },
} satisfies StoryObj<typeof OnyxSliderControl>;

export const IconControlIconIncrease = {
  args: {
    control: "icon",
    direction: "increase",
  },
} satisfies StoryObj<typeof OnyxSliderControl>;

export const IconControlInput = {
  args: {
    control: "input",
    modelValue: 0,
  },
} satisfies StoryObj<typeof OnyxSliderControl>;
