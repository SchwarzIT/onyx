import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxLink from "../OnyxLink/OnyxLink.vue";
import OnyxToast from "./OnyxToast.vue";

const meta: Meta<typeof OnyxToast> = {
  title: "components/Toast",
  ...defineStorybookActionsAndVModels({
    component: OnyxToast,
    events: ["click", "close"],
    argTypes: {
      default: { control: { type: "text" } },
      icon: defineIconSelectArgType(),
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxToast>;

export const Default = {
  args: {
    headline: "Example toast",
    icon: placeholder,
    description:
      "Lorem ipsum dolor sit amet consectetur. Non in felis erat velit consectetur. Sed integer non hac viverra nibh vehicula risus ultrices. Molestie cras lobortis vitae gravida et ut. Turpis nisl pharetra amet ante eu sagittis sit elementum ut.",
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    color: "danger",
  },
} satisfies Story;

export const Warning = {
  args: {
    ...Default.args,
    color: "warning",
  },
} satisfies Story;

export const Success = {
  args: {
    ...Default.args,
    color: "success",
  },
} satisfies Story;

export const Clickable = {
  args: {
    ...Default.args,
    clickable: true,
  },
} satisfies Story;

export const CustomContent = {
  args: {
    ...Default.args,
    default: () => [
      "This uses the slot to display ",
      h("strong", "custom content"),
      ". Click ",
      h(OnyxLink, { href: "#" }, () => "here"),
      " to open some link.",
    ],
  },
} satisfies Story;
