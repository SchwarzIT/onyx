import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRipple from "./OnyxRipple.vue";

/**
 * OnyxRipple provides visual feedback when a user interacts with the component. Supporting both touch and mouse events.
 */
const meta: Meta<typeof OnyxRipple> = {
  title: "Support/Ripple",
  ...defineStorybookActionsAndVModels({
    component: OnyxRipple,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRipple>;

/**
 * Default properties like color and durations can be overridden. Click anywhere to create a ripple.
 */
export const Default = {
  args: {},
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="position: relative; overflow: hidden; padding: 2rem; max-width: 100px;">
          <span style="z-index: 1; position: relative; pointer-events: none;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
          <story />
        </div>`,
    }),
  ],
} satisfies Story;
