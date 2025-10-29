import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSegmentedControl from "./OnyxSegmentedControl.vue";

/**
 * SegmentedControl is an interactive element that allow users to make a single selection from a set of mutually exclusive options.
 * Users can choose only one option at the time.
 */
const meta: Meta<typeof OnyxSegmentedControl> = {
  title: "Navigation/SegmentedControl",
  component: OnyxSegmentedControl,
};

export default meta;
type Story = StoryObj<typeof OnyxSegmentedControl>;

export const Default = {
  args: {
    modelValue: "option-1",
    options: [
      { value: "option-1", label: "Option 1" },
      { value: "option-2", label: "Option 2" },
      { value: "option-3", label: "Option 3" },
    ],
  },
} satisfies Story;

export const Icon = {
  args: {
    modelValue: "option-1",
    options: [
      {
        value: "option-1",
        label: "Option 1",
        icon: iconPlaceholder,
        hideLabel: true,
      },
      {
        value: "option-2",
        icon: iconPlaceholder,
        label: "Option 2",
        hideLabel: true,
      },
    ],
  },
} satisfies Story;

export const TextAndIcon = {
  args: {
    modelValue: "option-1",
    options: [
      {
        value: "option-1",
        label: "Option 1",
        icon: iconPlaceholder,
      },
      {
        value: "option-2",
        label: "Option 2",
        icon: iconPlaceholder,
      },
    ],
  },
} satisfies Story;

export const Disabled = {
  args: {
    modelValue: "option-1",
    options: [
      { value: "option-1", label: "Option 1" },
      { value: "option-2", label: "Option 2" },
      { value: "option-3", label: "Option 3", disabled: true },
    ],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    skeleton: true,
  },
} satisfies Story;
