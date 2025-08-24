import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSegmentedControlElement from "./OnyxSegmentedControlElement.vue";

/**
 * The SegmentedControlElement is only intended to be used within the `SegmentedControl` component.
 */
const meta: Meta<typeof OnyxSegmentedControlElement> = {
  title: "Support/SegmentedControlElement",
  component: OnyxSegmentedControlElement,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OnyxSegmentedControlElement>;

export const Default = {
  args: {
    value: "option",
    text: "Option",
  },
} satisfies Story;

export const Icon = {
  args: {
    value: "option",
    icon: iconPlaceholder,
  },
} satisfies Story;
export const TextAndIcon = {
  args: {
    value: "option",
    text: "Option",
    icon: iconPlaceholder,
  },
} satisfies Story;
export const Disabled = {
  args: {
    value: "option",
    text: "Option",
    disabled: true,
  },
} satisfies Story;
