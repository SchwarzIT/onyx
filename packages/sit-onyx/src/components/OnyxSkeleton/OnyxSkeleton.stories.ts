import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSkeleton from "./OnyxSkeleton.vue";

/**
 * **Note**: You need to set the skeleton width and height via CSS, otherwise it will not show.
 */
const meta: Meta<typeof OnyxSkeleton> = {
  title: "components/OnyxSkeleton",
  ...defineStorybookActionsAndVModels({
    component: OnyxSkeleton,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `<story style="width: 8rem; height: 2rem;" />`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSkeleton>;

export const Default = { args: {} } satisfies Story;
