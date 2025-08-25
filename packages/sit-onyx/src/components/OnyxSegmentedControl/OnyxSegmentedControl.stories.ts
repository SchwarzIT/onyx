import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxSegmentedControlElement from "../OnyxSegmentedControlElement/OnyxSegmentedControlElement.vue";
import OnyxSegmentedControl from "./OnyxSegmentedControl.vue";

/**
 * The select option is only intended to be used within the `OnyxSelect` component.
 */
const meta: Meta<typeof OnyxSegmentedControl> = {
  title: "Navigation/SegmentedControl",
  tags: ["new:component"],
  component: OnyxSegmentedControl,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OnyxSegmentedControl>;
export const Default = {
  args: {},
  render: (args) => ({
    setup: () => {
      const children = [
        h(OnyxSegmentedControlElement, {
          value: "option-1",
          label: "Option 1",
        }),
        h(OnyxSegmentedControlElement, {
          value: "option-2",
          label: "Option 2",
        }),
      ];
      return () => h(OnyxSegmentedControl, args, () => children);
    },
  }),
};
export const Icon = {
  args: {},
  render: (args) => ({
    setup: () => {
      const children = [
        h(OnyxSegmentedControlElement, {
          value: "option-1",
          icon: iconPlaceholder,
        }),

        h(OnyxSegmentedControlElement, {
          value: "option-2",
          icon: iconPlaceholder,
        }),
      ];
      return () => h(OnyxSegmentedControl, args, () => children);
    },
  }),
};
export const TextAndIcon = {
  args: {},
  render: (args) => ({
    setup: () => {
      const children = [
        h(OnyxSegmentedControlElement, {
          value: "option-1",
          label: "Option 1",
          icon: iconPlaceholder,
        }),

        h(OnyxSegmentedControlElement, {
          value: "option-2",
          label: "Option 2",
          icon: iconPlaceholder,
        }),
      ];
      return () => h(OnyxSegmentedControl, args, () => children);
    },
  }),
};
export const CustomElements = {
  args: {},
  render: (args) => ({
    setup: () => {
      const children = [
        h(
          OnyxSegmentedControlElement,
          {
            value: "option-1",
          },
          () => "Option 1",
        ),

        h(
          OnyxSegmentedControlElement,
          {
            value: "option-2",
          },
          () => "Option 2",
        ),

        h(
          OnyxSegmentedControlElement,
          {
            value: "option-3",
          },
          () => "Option 3",
        ),
      ];

      return () => h(OnyxSegmentedControl, args, () => children);
    },
  }),
} satisfies Story;

export const Disabled = {
  args: {},
  render: (args) => ({
    setup: () => {
      const children = [
        h(OnyxSegmentedControlElement, {
          value: "option-1",
          label: "Option 1",
          disabled: true,
        }),
        h(OnyxSegmentedControlElement, {
          value: "option-2",
          label: "Option 2",
        }),
        h(OnyxSegmentedControlElement, {
          value: "option-3",
          label: "Option 2",
        }),
      ];
      return () => h(OnyxSegmentedControl, args, () => children);
    },
  }),
} satisfies Story;

export const Skeleton = {
  args: {
    skeleton: true,
  },
} satisfies Story;
