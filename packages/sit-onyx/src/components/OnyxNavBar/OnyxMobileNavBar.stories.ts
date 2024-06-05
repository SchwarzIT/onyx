import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxMobileNavBar from "./OnyxMobileNavBar.vue";

const meta: Meta<typeof OnyxMobileNavBar> = {
  title: "support/MobileNavBar",
  ...defineStorybookActionsAndVModels({
    component: OnyxMobileNavBar,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="padding-bottom: 24rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxMobileNavBar>;

export const Default = { args: {} } satisfies Story;
