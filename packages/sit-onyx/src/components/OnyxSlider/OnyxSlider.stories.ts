import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSlider from "./OnyxSlider.vue";
import type { SliderMode } from "./types.js";

/**
 * The slider component allows users to select a value (or a range of two values) inside a given min/max range by dragging a thumb along a track.
 */
const meta: Meta<typeof OnyxSlider> = {
  title: "Form Elements/Slider",
  component: OnyxSlider as Meta["component"],
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

// Storybook does not yet support generics in stories well, so we use a non-generic Record here
type Story<TMode extends SliderMode = "single"> = StoryObj<typeof OnyxSlider<TMode>>;

export const Default = {
  args: {
    modelValue: 50,
    label: "Default",
  },
} satisfies Story;

export const Range = {
  args: {
    mode: "range",
    modelValue: [25, 75],
    label: "Range mode",
  },
} satisfies Story<"range">;

export const Marks = {
  args: {
    ...Default.args,
    label: "With marks",
    marks: [
      { value: 0, label: "0°C" },
      { value: 25, label: "25°C" },
      { value: 50, label: "50°C" },
      { value: 75, label: "75°C" },
      { value: 100, label: "100°C" },
    ],
  },
} satisfies Story;

export const Discrete = {
  args: {
    label: "Discrete",
    modelValue: 0,
    discrete: true,
    max: 5,
    // TODO: also support discrete sliders without marks
    marks: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    label: "Disabled",
    disabled: true,
  },
} satisfies Story;

export const Message = {
  args: {
    ...Default.args,
    label: "Message",
    message: { shortMessage: "Example message", longMessage: "Example long message" },
  },
} satisfies Story;

export const CustomError = {
  args: {
    ...Default.args,
    label: "Custom Error",
    showError: true,
    error: {
      shortMessage: "Custom error",
      longMessage: "This text might inform the users what they can do to fix the error.",
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

export const Vertical = {
  args: {
    ...Default.args,
    label: "Vertical",
    orientation: "vertical",
    marks: [
      { value: 0, label: "0°C" },
      { value: 25, label: "25°C" },
      { value: 50, label: "50°C" },
      { value: 75, label: "75°C" },
      { value: 100, label: "100°C" },
    ],
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: max-content; height: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story;

export const IconControl = {
  args: {
    ...Default.args,
    label: "Icon control",
    control: "icon",
  },
} satisfies Story;

export const ValueControl = {
  args: {
    ...Default.args,
    label: "Value control",
    control: "value",
  },
} satisfies Story;
