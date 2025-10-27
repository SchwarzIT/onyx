import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSlider from "./OnyxSlider.vue";
import type { SliderMode } from "./types.js";

/**
 * The slider component allows users to select a value from a range by dragging a thumb along a track.
 */
const meta: Meta<typeof OnyxSlider> = {
  title: "Form Elements/Slider",
  // @ts-expect-error: Generic component typing is complex with Storybook
  component: OnyxSlider,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    ...withNativeEventLogging(["onChange"]),
  },
};

export default meta;

// Storybook does not yet support generics in stories well, so we use a non-generic Record here
type Story<TMode extends SliderMode = "single"> = StoryObj<typeof OnyxSlider<TMode>>;

/**
 * This example shows the default state of the slider.
 */
export const Default = {
  args: {
    modelValue: 40,
    label: "Default",
  },
} satisfies Story;

/**
 * This example shows a slider with a hidden label.
 */
export const HiddenLabel = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows a slider with a custom error message.
 * Will only be shown after interacting with the slider.
 */
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

/**
 * This example shows a slider with a message / help text at the bottom.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: { shortMessage: "Example message" },
  },
} satisfies Story;

/**
 * This example shows a skeleton slider.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows the slider in range mode with two thumbs.
 */
export const RangeMode = {
  args: {
    mode: "range",
    modelValue: [20, 75],
    label: "Range mode",
  },
} satisfies Story<"range">;

/**
 * This example shows the disabled state of the slider.
 */
export const Disabled = {
  args: {
    mode: "range",
    disabled: true,
    modelValue: [20, 40],
    label: "Disabled",
  },
} satisfies Story<"range">;

/**
 * This example shows the slider with marks.
 */
export const WithMarks = {
  args: {
    mode: "range",
    modelValue: [20, 40],
    marks: [0, 25, 50, 75, 100],
    label: "With Marks",
  },
} satisfies Story<"range">;

/**
 * This example shows the slider with marks and labels.
 */
export const WithLabelledMarks = {
  args: {
    mode: "range",
    modelValue: [20, 40],
    marks: [
      { value: 0, label: "0°C" },
      { value: 25, label: "25°C" },
      { value: 50, label: "50°C" },
      { value: 75, label: "75°C" },
      { value: 100, label: "100°C" },
    ],
    label: "With Labelled Marks",
    message: { shortMessage: "Example message" },
  },
} satisfies Story<"range">;

/**
 * This example shows the disabled slider with marks and labels.
 */
export const DisabledWithLabelledMarks = {
  args: {
    mode: "range",
    disabled: true,
    modelValue: [20, 40],
    marks: [
      { value: 0, label: "0°C" },
      { value: 25, label: "25°C" },
      { value: 50, label: "50°C" },
      { value: 75, label: "75°C" },
      { value: 100, label: "100°C" },
    ],
    label: "Disabled With Labelled Marks",
  },
} satisfies Story<"range">;

/**
 * This example shows the slider with automatically generated marks.
 * The marks are generated based on the `step` property.
 * If `marks` is `true`, marks will be shown for each step.
 */
export const AutomaticallyGeneratedMarks = {
  args: {
    mode: "range",
    modelValue: [20, 40],
    step: 10,
    marks: true,
    label: "Automatically Generated Marks",
  },
} satisfies Story<"range">;

/**
 * This example shows the discrete state of the slider with marks.
 * The step is set to null, so the thumbs can only be moved to the marks.
 */
export const Discrete = {
  args: {
    modelValue: 0,
    discrete: true,
    label: "Discrete",
    marks: [
      { value: 0, label: "-2" },
      { value: 25, label: "-1" },
      { value: 50, label: "0" },
      { value: 75, label: "1" },
      { value: 100, label: "2" },
    ],
  },
} satisfies Story;

/**
 * This example shows the vertical orientation of the slider.
 */
export const Vertical = {
  args: {
    mode: "range",
    modelValue: [20, 40],
    label: "Vertical slider",
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
      template: `<div style="width: 5rem; height: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story<"range">;

/**
 * This example shows the slider with tooltip always visible.
 */
export const DisabledTooltip = {
  args: {
    modelValue: 40,
    label: "With tooltip",
    disableTooltip: true,
    marks: [0, 25, 50, 75, 100],
    step: 5,
  },
} satisfies Story;

/**
 * This example shows the slider with value controls (min/max labels).
 */
export const WithValueControl = {
  args: {
    modelValue: 40,
    label: "Value control",
    control: "value",
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows the slider with icon controls for increment/decrement.
 */
export const WithIconControl = {
  args: {
    modelValue: 40,
    label: "Icon control",
    control: "icon",
    hideLabel: true,
  },
} satisfies Story;
