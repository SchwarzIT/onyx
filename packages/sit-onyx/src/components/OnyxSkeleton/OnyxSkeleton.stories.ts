import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSkeleton from "./OnyxSkeleton.vue";

/**
 * **Note**: If the height/width is not set via CSS, it will use/inherit the full available space.
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

/**
 * A default skeleton.
 */
export const Default = { args: {} } satisfies Story;
