import { iconSettings } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { OnyxButton, OnyxIconButton } from "../../index.js";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxCalendar from "./OnyxCalendar.vue";

const meta: Meta<typeof OnyxCalendar> = {
  title: "Data/Calendar",
  tags: ["unstable"],
  component: OnyxCalendar,
  args: {
    style: {
      maxWidth: "45rem",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCalendar>;
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

export const CustomDayContent = {
  ...createAdvancedStoryExample("OnyxCalendar", "CustomDayContentExample"),
} satisfies Story;

export const MinMaxDate = {
  args: {
    min: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    max: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  },
} satisfies Story;

export const ViewMonth = {
  ...createAdvancedStoryExample("OnyxCalendar", "ViewMonthExample"),
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
