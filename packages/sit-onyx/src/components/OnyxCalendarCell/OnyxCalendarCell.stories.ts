import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxCalendarCell from "./OnyxCalendarCell.vue";

const meta: Meta<typeof OnyxCalendarCell> = {
  title: "Support/CalendarCell",
  component: OnyxCalendarCell,
};

export default meta;
type Story = StoryObj<typeof OnyxCalendarCell>;

export const Default = {
  args: {
    date: 4,
    style: "background-color: var(--onyx-color-base-background-blank); height: 6rem; width: 6rem",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Button = {
  args: {
    ...Default.args,
    is: "button",
  },
} satisfies Story;

export const Neutral = {
  args: {
    ...Button.args,
    color: "neutral",
  },
} satisfies Story;

export const Primary = {
  args: {
    ...Button.args,
    color: "primary",
  },
} satisfies Story;

export const RangeStart = {
  args: {
    ...Primary.args,
    rangeType: "start",
  },
} satisfies Story;

export const RangeMiddle = {
  args: {
    ...Primary.args,
    rangeType: "middle",
  },
} satisfies Story;

export const RangeEnd = {
  args: {
    ...Primary.args,
    rangeType: "end",
  },
} satisfies Story;
