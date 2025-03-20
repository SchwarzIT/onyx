import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxButton from "./OnyxButton.vue";

/**
 * Buttons serve as fundamental components in UI design,
 * acting as gateways for user interactions and pivotal points for
 * initiating actions within an interface.
 * Whether prompting users to submit forms,
 * navigate through pages, or trigger specific functionalities,
 * buttons play a pivotal role in guiding users through their
 * digital journey.
 */
const meta: Meta<typeof OnyxButton> = {
  title: "Buttons/Button",
  component: OnyxButton,
  argTypes: {
    icon: defineIconSelectArgType(),
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxButton>;

/**
 * This example shows the button in primary color
 */
export const Primary = {
  args: {
    label: "Button",
  },
} satisfies Story;

/**
 * This example shows the button in neutral color
 */
export const Neutral = {
  args: {
    label: "Button",
    color: "neutral",
  },
} satisfies Story;

/**
 * This example shows the button in danger color
 */
export const Danger = {
  args: {
    label: "Button",
    color: "danger",
  },
} satisfies Story;

/**
 * This example shows the button that opens a link.
 */
export const WithLink = {
  args: {
    label: "Click to open link",
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
  },
} satisfies Story;

/**
 * This example shows the button in loading state
 */
export const Loading = {
  args: {
    label: "Button",
    loading: true,
  },
} satisfies Story;

/**
 * This example shows the button with icon
 */
export const WithIcon = {
  args: {
    label: "Button",
    icon: checkSmall,
  },
} satisfies Story;

/**
 * This example shows the button with truncation.
 */
export const WithTruncation = {
  args: {
    label: "Button with a very long text that gets truncated",
    style: "max-width: 16rem",
  },
} satisfies Story;

/**
 * This example shows a skeleton button.
 */
export const Skeleton = {
  args: {
    ...Primary.args,
    skeleton: true,
  },
} satisfies Story;
