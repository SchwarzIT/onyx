import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSegmentedControlElement from "./OnyxSegmentedControlElement.vue";

/**
 * The OnyxSegmentedControlElement is only intended to be used within the `OnyxSegmentedControl.
 */
const meta: Meta<typeof OnyxSegmentedControlElement> = {
  title: "Support/SegmentedControlElement",
  tags: ["new:component"],
  component: OnyxSegmentedControlElement,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OnyxSegmentedControlElement>;

export const Default = {
  args: {
    name: "seg-element",
    value: "option-1",
    label: "Option 1",
  },
} satisfies Story;
export const Icon = {
  args: {
    value: "option-1",
    label: "Option 1",
    hideLabel: true,
    icon: iconPlaceholder,
  },
} satisfies Story;
export const TextAndIcon = {
  args: {
    value: "option-1",
    label: "Option 1",
    icon: iconPlaceholder,
  },
} satisfies Story;
export const Disabled = {
  args: {
    value: "option-1",
    label: "Option 1",
    disabled: true,
  },
} satisfies Story;
