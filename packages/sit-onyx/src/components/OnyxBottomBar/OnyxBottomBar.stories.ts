import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxPageLayout from "../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxBottomBar from "./OnyxBottomBar.vue";

/**
 * A bottom bar is a navigation bar at the bottom of an app or webpage.
 * Preferably used together with [OnyxPageLayout](/docs/layout-pagelayout--docs).
 */
const meta: Meta<typeof OnyxBottomBar> = {
  title: "Navigation/BottomBar",
  component: OnyxBottomBar,
  argTypes: {
    default: { control: { disable: true } },
    left: { control: { disable: true } },
  },
  decorators: [
    (story) => ({
      components: { story, OnyxPageLayout },
      template: `
        <OnyxPageLayout style="height: 15rem;" >
          <template #footer>
            <story />
          </template>
        </OnyxPageLayout>`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxBottomBar>;

/**
 * This example shows a bottom bar with right aligned buttons.
 */
export const Default = {
  args: {
    default: () => [
      h(OnyxButton, { label: "Button", mode: "plain", color: "neutral" }),
      h(OnyxButton, { label: "Button" }),
    ],
  },
} satisfies Story;

/**
 * This example shows a bottom bar with left aligned buttons.
 */
export const WithLeftSlot = {
  args: {
    left: () => [
      h(OnyxIconButton, { label: "Prev", icon: chevronLeftSmall, color: "neutral" }),
      h(OnyxIconButton, { label: "Next", icon: chevronRightSmall, color: "neutral" }),
    ],
  },
} satisfies Story;

/**
 * This example shows a bottom bar with both left and right aligned buttons.
 */
export const WithLeftAndRightSlot = {
  args: {
    default: Default.args.default,
    left: WithLeftSlot.args.left,
  },
} satisfies Story;
