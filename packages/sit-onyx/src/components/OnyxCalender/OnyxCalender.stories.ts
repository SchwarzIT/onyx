import { iconSettings } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { OnyxButton, OnyxIconButton } from "../../index.js";
import OnyxCalender from "./OnyxCalender.vue";

const meta: Meta<typeof OnyxCalender> = {
  title: "Form/Calender",
  tags: ["new:component"],
  component: OnyxCalender,
  args: {
    style: {
      maxWidth: "45rem",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCalender>;
export const Default = {} satisfies Story;
export const Small = {
  args: {
    size: "small",
    style: {
      maxWidth: "25rem",
    },
  },
} satisfies Story;

export const CustomActions = {
  args: {
    actions: () => [
      h(OnyxIconButton, { icon: iconSettings, label: "Settings", color: "neutral" }),
      h(OnyxButton, { label: "Filter", color: "neutral" }),
      h(OnyxButton, { label: "Month", color: "neutral" }),
    ],
  },
} satisfies Story;

export const MinMaxDate = {
  args: {
    min: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    max: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    skeleton: true,
  },
} satisfies Story;
export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;
