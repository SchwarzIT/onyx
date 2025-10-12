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
      control: { type: "radio", options: ["default", "inverted"] },
    },
    orientation: {
      control: { type: "radio", options: ["horizontal", "vertical"] },
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
};

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
export const VerticalSlider = {
  args: {
    modelValue: [20, 40],
    label: "Label",
    hideLabel: true,
    orientation: "vertical",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem; height: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story;

/**
 * This example shows the vertical orientation of the slider.
 */
export const VerticalSliderWithMarks = {
  args: {
    modelValue: [20, 40],
    marks: [0, 25, 50, 75, 100],
    label: "Label",
    hideLabel: true,
    orientation: "vertical",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem; height: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story;

/**
 * This example shows the vertical orientation of the slider with labelled marks.
 */
export const VerticalSliderWithLabelledMarks = {
  args: {
    modelValue: [20, 40],
    autofocus: true,
    marks: [
      { value: 0, label: "0°C" },
      { value: 25, label: "25°C" },
      { value: 50, label: "50°C" },
      { value: 75, label: "75°C" },
      { value: 100, label: "100°C" },
    ],
    label: "Label",
    hideLabel: true,
    orientation: "vertical",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem; height: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story;

/**
 * This example shows the vertical orientation of the slider with labelled marks and inverted track mode.
 */
export const VerticalSliderWithLabelledMarksInverted = {
  args: {
    modelValue: [20, 80],
    autofocus: true,
    trackMode: "inverted",
    marks: [
      { value: 0, label: "0°C" },
      { value: 25, label: "25°C" },
      { value: 50, label: "50°C" },
      { value: 75, label: "75°C" },
      { value: 100, label: "100°C" },
    ],
    label: "Label",
    hideLabel: true,
    orientation: "vertical",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem; height: 16rem;"> <story /> </div>`,
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
    autofocus: true,
  },
} satisfies Story;

export const TooltipAuto = {
  args: {
    modelValue: [40],
    label: "Tooltip Auto",
    tooltipDisplay: "auto",
    marks: [0, 25, 50, 75, 100],
    step: 5,
    autofocus: true,
  },
} satisfies Story;

export const TooltipAlways = {
  args: {
    modelValue: [40],
    label: "Tooltip Always",
    tooltipDisplay: "always",
    marks: [0, 25, 50, 75, 100],
    step: 5,
    autofocus: true,
  },
} satisfies Story;

export const TooltipNever = {
  args: {
    modelValue: [40],
    label: "Tooltip Never",
    tooltipDisplay: "never",
    marks: [0, 25, 50, 75, 100],
    step: 5,
    autofocus: true,
  },
} satisfies Story;
