import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxBottomBar from "./OnyxBottomBar.vue";

/**
 * A bottom bar is a navigation bar at the bottom of an app or webpage.
 * Preferably used together with [OnyxPageLayout](/docs/layout-pagelayout--docs)
 */
const meta: Meta<typeof OnyxBottomBar> = {
  title: "Navigation/BottomBar",
  component: OnyxBottomBar,
  argTypes: {
    right: { control: { disable: true } },
    left: { control: { disable: true } },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <OnyxPageLayout style="height: 15rem;" >
          <story v-slot="footer" />
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
    right: () => [
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
    left: () => [h(OnyxButton, { label: "Button" })],
  },
} satisfies Story;

/**
 * This example shows a bottom bar with both left and right aligned buttons.
 */
export const WithLeftAndRightSlot = {
  args: {
    right: () => [
      h(OnyxButton, { label: "Button", mode: "plain", color: "neutral" }),
      h(OnyxButton, { label: "Button" }),
    ],
    left: () => [h(OnyxButton, { label: "Approve" })],
  },
} satisfies Story;
