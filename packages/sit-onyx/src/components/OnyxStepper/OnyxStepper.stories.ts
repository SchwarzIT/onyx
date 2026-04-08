import { iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import OnyxStepper from "./OnyxStepper.vue";

/**
 * The stepper component lets users input numerical values and adjust them incrementally via plus and minus buttons, making it ideal for setting quantities or values in small, controlled steps.
 */

const meta: Meta<typeof OnyxStepper> = {
  title: "Form Elements/Stepper",
  component: OnyxStepper,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 20rem;"> <story /> </div>`,
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

/**
 * This example shows a stepper with formatted Number
 */
export const FormattedNumber = {
  args: {
    ...Default.args,
    formatNumber: true,
  },
} satisfies Story;

/**
 * This example shows a stepper with a custom formatted Number
 */
export const CustomFormattedNumber = {
  args: {
    ...Default.args,
    formatNumber(value: number): string {
      return new Intl.NumberFormat("de-DE", {
        useGrouping: true,
      })
        .format(value)
        .replace(/\./g, " ");
    },
  },
} satisfies Story;

export const LeftLabel = {
  tags: ["new:feature"],
  args: {
    label: { label: Default.args.label, position: "left" },
  },
} satisfies Story;

export const ValueAlignment = {
  tags: ["new:feature"],
  args: {
    ...Default.args,
    modelValue: 42,
    style: "--onyx-stepper-text-align: left;",
  },
} satisfies Story;

export const Slots = {
  tags: ["new:feature"],
  args: {
    ...Default.args,
    leadingIcons: () => [h(OnyxIcon, { icon: iconPlaceholder })],
    trailingIcons: () => [h(OnyxIcon, { icon: iconPlaceholder })],
    leading: () =>
      h("span", { style: "padding-inline: var(--onyx-form-element-v2-padding-inline)" }, "Leading"),
    trailing: () =>
      h(OnyxSelect, {
        label: "Label",
        listLabel: "List label",
        hideLabel: true,
        options: [{ label: "kg", value: "kg" }],
        modelValue: "kg",
        alignment: "right",
        hideClearIcon: true,
      }),
  },
} satisfies Story;
