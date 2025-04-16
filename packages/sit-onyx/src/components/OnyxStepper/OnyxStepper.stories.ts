import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxStepper from "./OnyxStepper.vue";

const meta: Meta<typeof OnyxStepper> = {
  title: "Form Elements/Stepper",
  component: OnyxStepper,
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
type Story = StoryObj<typeof OnyxStepper>;

/**
 * This example shows the default state of the stepper.
 */
export const Default = {
  args: {
    label: "Stepper",
  },
} satisfies Story;

/**
 * This example shows a stepper with precision two always show two decimal places.
 */
export const Precision = {
  args: {
    label: "Currency",
    modelValue: 5,
    precision: 2,
  },
} satisfies Story;

/**
 * This example shows the stepper with a placeholder.
 */
export const Placeholder = {
  args: {
    label: "Stepper",
    placeholder: "0",
  },
} satisfies Story;

/**
 * This example shows the stepper in disabled state.
 */
export const Disabled = {
  args: {
    label: "Disabled",
    disabled: true,
  },
} satisfies Story;

/**
 * This example shows the stepper in readonly state.
 */
export const Readonly = {
  args: {
    label: "Readonly",
    readonly: true,
  },
} satisfies Story;

/**
 * This example shows the loading state of the stepper.
 */
export const Loading = {
  args: {
    label: "Loading",
    loading: true,
  },
} satisfies Story;

/**
 * This example shows the stepper without a visual label.
 * For accessibility / screen readers it must still be passed.
 */
export const HiddenLabel = {
  args: {
    label: "Accessibility Label",
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows a required stepper.
 */
export const Required = {
  args: {
    label: "Required",
    required: true,
  },
} satisfies Story;

/**
 * This example shows a skeleton stepper.
 */
export const Skeleton = {
  args: {
    label: "Skeleton",
    skeleton: true,
  },
} satisfies Story;

/**
 * This example shows a stepper with hidden buttons.
 */
export const HiddenButtons = {
  args: {
    ...Default.args,
    hideButtons: true,
  },
} satisfies Story;
