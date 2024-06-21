import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSkeleton from "./OnyxSkeleton.vue";

/**
 * The skeleton can be used during the process of building up / loading the initial page.
 *
 * **Note**: Apply height/width via CSS.
 */
const meta: Meta<typeof OnyxSkeleton> = {
  title: "Support/Skeleton",
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
