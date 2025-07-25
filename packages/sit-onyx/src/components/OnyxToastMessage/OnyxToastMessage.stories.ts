import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxToastMessage from "./OnyxToastMessage.vue";

/**
 * Single toast message component. Is mainly intended to be used with the [OnyxToast](/docs/feedback-toast--docs).
 */
const meta: Meta<typeof OnyxToastMessage> = {
  title: "Support/ToastMessage",
  component: OnyxToastMessage,
  argTypes: {
    icon: defineIconSelectArgType(),
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxToastMessage>;

export const Default = {
  args: {
    headline: "Example toast",
    description: "Lorem ipsum dolor sit amet consectetur. Non in felis erat velit consectetur.",
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

export const Closable = {
  args: {
    ...Default.args,
    duration: 0,
  },
} satisfies Story;

/**
 * This example shows a toast with a very long description that is limited to 3 lines.
 * The user can scroll to see the rest of the description.
 */
export const LongDescription = {
  args: {
    ...Default.args,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
} satisfies Story;

/**
 * This example shows a toast with the minimal amount of data.
 */
export const MinimalData = {
  args: {
    headline: Default.args.headline,
    icon: false,
  },
} satisfies Story;
