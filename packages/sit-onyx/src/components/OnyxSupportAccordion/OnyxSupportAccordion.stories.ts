import chevronDownSmall from "@sit-onyx/icons/chevron-down-small.svg?raw";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import minusSmall from "@sit-onyx/icons/minus-small.svg?raw";
import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { OnyxBadge, OnyxTab } from "../../";
import OnyxSupportAccordion from "./OnyxSupportAccordion.vue";

const iconOptions = {
  "plus-small": plusSmall,
  "minus-small": minusSmall,
  "chevron-down-small": chevronDownSmall,
  "chevron-left-small": chevronLeftSmall,
};

const colorOptions = {
  primary: "primary",
  secondary: "secondary",
  neutral: "neutral",
  danger: "danger",
  warning: "warning",
  success: "success",
  info: "info",
};

const meta: Meta<typeof OnyxSupportAccordion> = {
  title: "Support/SupportAccordion",
  component: OnyxSupportAccordion,
  argTypes: {
    label: { type: "string", control: "text", description: "Add the title of the accordion." },
    iconPosition: {
      type: "string",
      control: "select",
      options: ["next", "end"],
      description: "Set the position of the collapse/expand icon.",
    },
    color: {
      type: "string",
      control: "select",
      options: Object.keys(colorOptions),
      mapping: colorOptions,
      description: "Set the background color of the accordion header.",
    },
    openIconType: {
      type: "string",
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: "This is the icon that will be displayed, when the accordion is expanded.",
    },
    closeIconType: {
      type: "string",
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: "This is the icon that will be displayed, when the accordion is collapsed.",
    },
    header: {
      description: "Slot that can be used to create custom header for the accordion component",
    },
    default: { description: "Slot that can be used to add content to the accordion body." },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSupportAccordion>;

export const Default = {
  args: {
    label: "Example title",
    header: () => {
      h("div", null, () => "test");
    },
    default: () => [
      h(
        OnyxTab,
        { value: "tab-3", label: "Disabled tab 3", disabled: true },
        () => "Panel content 3...",
      ),
      h(
        OnyxTab,
        { value: "tab-4" },
        {
          default: () => "Panel content 3...",
          tab: () => ["Tab 4", h(OnyxBadge, { dot: true, color: "warning" })],
        },
      ),
    ],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
