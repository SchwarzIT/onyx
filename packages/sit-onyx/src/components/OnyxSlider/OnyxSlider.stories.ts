import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSlider from "./OnyxSlider.vue";

/**
 * The slider component allows users to select a value from a range by dragging a thumb along a track.
 */

const meta: Meta<typeof OnyxSlider> = {
  title: "Form Elements/Slider",
  component: OnyxSlider,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    ...withNativeEventLogging(["onChange"]),
    trackMode: {
      control: { type: "radio" },
      options: ["default", "inverted", false],
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    control: {
      control: { type: "radio" },
      options: ["value", "input", "icon"],
    },
    tooltipDisplay: {
      control: { type: "radio" },
      options: ["auto", "always", "never"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSlider>;

/**
 * This example shows the default state of the slider.
 */
export const Default = {
  args: {
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
    customError: {
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
  },
} satisfies Story;

/**
 * This example shows the slider with two thumbs.
 */
export const TwoThumbs = {
  args: {
    modelValue: [20, 75],
    label: "Two Thumbs",
  },
} satisfies Story;

/**
 * This example shows the slider with two thumbs.
 */
export const ThreeThumbs = {
  args: {
    modelValue: [20, 30, 40],
    label: "Three Thumbs",
  },
} satisfies Story;

/**
 * This example shows the disabled state of the slider.
 */
export const Disabled = {
  args: {
    disabled: true,
    modelValue: [20, 40],
    label: "Disabled",
  },
} satisfies Story;

/**
 * This example shows the slider with marks.
 */
export const WithMarks = {
  args: {
    modelValue: [20, 40],
    marks: [0, 25, 50, 75, 100],
    label: "With Marks",
  },
} satisfies Story;

/**
 * This example shows the slider with marks and labels.
 */
export const WithLabelledMarks = {
  args: {
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
} satisfies Story;

/**
 * This example shows the disabled slider with marks and labels.
 */
export const DisabledWithLabelledMarks = {
  args: {
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
} satisfies Story;

/**
 * This example shows the slider with automatically generated marks.
 * The marks are generated based on the `step` property.
 * If `marks` is `true`, marks will be shown for each step.
 */
export const AutomaticallyGeneratedMarks = {
  args: {
    modelValue: [20, 40],
    step: 10,
    marks: true,
    label: "Automatically Generated Marks",
  },
} satisfies Story;

/**
 * This example shows the discrete state of the slider with marks.
 * The step is set to null, so the thumbs can only be moved to the marks.
 */
export const Discrete = {
  args: {
    modelValue: [0],
    step: null,
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
    modelValue: [20, 40],
    label: "Vertical slider",
    hideLabel: true,
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
      template: `<div style="width: 4rem; height: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story;

/**
 * This example shows the slider with inverted track mode.
 * The track fills the area outside the active thumbs instead of between them.
 */
export const InvertedTrack = {
  args: {
    modelValue: [20, 80],
    label: "Inverted Track",
    trackMode: "inverted",
  },
} satisfies Story;

/**
 * This example shows the slider with no track (trackMode: false).
 * Only the rail and thumbs are visible.
 */
export const NoTrack = {
  args: {
    modelValue: [30, 70],
    label: "No Track",
    trackMode: false,
  },
} satisfies Story;

/**
 * This example shows different track modes with marks for better visualization.
 */
export const InvertedTrackWithMarks = {
  args: {
    modelValue: [30, 70],
    label: "Inverted Track with Marks",
    trackMode: "inverted",
    marks: [0, 25, 50, 75, 100],
  },
} satisfies Story;

/**
 * This example shows the slider with tooltip always visible.
 */
export const WithTooltip = {
  args: {
    modelValue: [40],
    label: "With tooltip",
    tooltipDisplay: "always",
    marks: [0, 25, 50, 75, 100],
    step: 5,
  },
} satisfies Story;

/**
 * This example shows the slider with value controls (min/max labels).
 */
export const WithValueControl = {
  args: {
    modelValue: [40],
    label: "Value control",
    control: "value",
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows the slider with input controls for precise value entry.
 */
export const WithInputControl = {
  args: {
    modelValue: [40],
    label: "Input control",
    control: "input",
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows the slider with icon controls for increment/decrement.
 */
export const WithIconControl = {
  args: {
    modelValue: [40],
    label: "Icon control",
    control: "icon",
    hideLabel: true,
  },
} satisfies Story;
