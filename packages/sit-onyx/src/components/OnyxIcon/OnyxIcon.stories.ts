import { iconEmojiHappy2 } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType, textColorDecorator } from "../../utils/storybook.js";
import OnyxIcon from "./OnyxIcon.vue";

/**
 * Icons allow developers to integrate library icons directly into a project, enhancing visual communication and accessibility within the interface.
 * We recommend using the official icons from `@sit-onyx/icons` (see [documentation](https://onyx.schwarz/icons.html)).
 *
 * When importing icons from .svg files, make sure to add `?raw` after the file name to import the SVG content
 * instead of the file system path to the file.
 *
 * For usage instructions and a list of all onyx icons, please visit our [icon library](https://onyx.schwarz/icons.html).
 */
const meta: Meta<typeof OnyxIcon> = {
  title: "Basic/Icon",
  component: OnyxIcon,
  argTypes: {
    icon: defineIconSelectArgType({ required: true }),
  },

  decorators: [textColorDecorator],
};

export default meta;
type Story = StoryObj<typeof OnyxIcon>;

/**
 * This example shows a default icon.
 */
export const Default = {
  args: {
    icon: iconEmojiHappy2,
  },
} satisfies Story;

/**
 * This example shows an icon with a different size.
 */
export const WithSize = {
  args: {
    ...Default.args,
    size: "96px",
  },
} satisfies Story;

/**
 * This example shows an icon with a different color.
 */
export const WithColor = {
  args: {
    ...Default.args,
    color: "success",
  },
} satisfies Story;

/**
 * This example shows that and how the OnyxIcon can be used with text.
 */
export const Inline = {
  args: {
    ...Default.args,
    inline: true,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<p class="onyx-text" style="font-family: var(--onyx-font-family);" ><story /> Icons can also be used in combination with text. But don't forget, that they are not accessible <story /> and invisible to screen-readers. Your text must be comprehensible and work without them.</p>`,
    }),
  ],
} satisfies Story;
