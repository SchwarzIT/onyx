import expandWindow from "@sit-onyx/icons/expand-window.svg?raw";
import trash from "@sit-onyx/icons/trash.svg?raw";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxIconButton from "./OnyxIconButton.vue";

/**
 * An icon button serves as a compact, label-free version of a traditional button, used to trigger both primary and secondary actions. It’s a key interactive element, letting users engage quickly with content.
 */
const meta: Meta<typeof OnyxIconButton> = {
  title: "Buttons/IconButton",
  component: OnyxIconButton,
  argTypes: {
    icon: defineIconSelectArgType(),
    default: { control: { disable: true } },
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxIconButton>;

/**
 * This example shows the button in primary color.
 */
export const Primary = {
  args: {
    label: "Button",
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows the button in neutral color.
 */
export const Neutral = {
  args: {
    label: "Button",
    color: "neutral",
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows the button in danger color.
 */
export const Danger = {
  args: {
    label: "Button",
    color: "danger",
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows the button in danger color.
 */
export const WithLink = {
  args: {
    icon: expandWindow,
    label: "Open documentation",
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
  },
} satisfies Story;

/**
 * This example shows the with some custom content.
 */
export const Custom = {
  args: {
    label: "Button",
    default: () => h("figure", { style: "width: 1.5rem; height: 1.5rem;" }, "🎉"),
  },
} satisfies Story;

/**
 * This example shows a loading icon button.
 */
export const Loading = {
  args: {
    label: "Button",
    loading: true,
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows a skeleton icon button.
 */
export const Skeleton = {
  args: {
    label: "Button",
    skeleton: true,
  },
} satisfies Story;
