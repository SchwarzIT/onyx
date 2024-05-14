import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { AVATAR_TYPES } from "../..";
import OnyxAvatar from "../OnyxAvatar/OnyxAvatar.vue";
import OnyxAvatarStack from "./OnyxAvatarStack.vue";

/**
 * An avatar stack can be used to display a list of avatars (e.g. contributors for a project etc.).
 */
const meta: Meta<typeof OnyxAvatarStack> = {
  title: "components/AvatarStack",
  ...defineStorybookActionsAndVModels({
    component: OnyxAvatarStack,
    events: [],
    argTypes: {
      default: { control: { disable: true } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxAvatarStack>;

/**
 * This example shows a default avatar stack.
 */
export const Default = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxAvatarStack, OnyxAvatar },
    template: `
      <OnyxAvatarStack>
        ${Array.from({ length: 6 }, (_, index) => {
          const label = `John Doe ${index + 1}`;
          const type = AVATAR_TYPES[index % AVATAR_TYPES.length];
          if (index % 2 === 0) return `<OnyxAvatar label="${label}" type="${type}" />`;
          return `<OnyxAvatar label="${label}" src="https://onyx.schwarz/favicon.svg" />`;
        }).join("\n")}
      </OnyxAvatarStack>`,
  }),
} satisfies Story;

/**
 * This example shows an avatar stack with a limited number of avatars and a remaining indicator.
 */
export const LimitedCount = {
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxAvatarStack, OnyxAvatar },
    template: `
      <OnyxAvatarStack>
        ${Array.from({ length: 12 }, (_, index) => {
          const label = `John Doe ${index + 1}`;
          const type = AVATAR_TYPES[index % AVATAR_TYPES.length];
          if (index % 2 === 0) return `<OnyxAvatar label="${label}" type="${type}" />`;
          return `<OnyxAvatar label="${label}" src="https://onyx.schwarz/favicon.svg" />`;
        }).join("\n")}
        <OnyxAvatar label="42 more avatars">+42</OnyxAvatar>
      </OnyxAvatarStack>`,
  }),
} satisfies Story;
