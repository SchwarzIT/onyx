import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSkeleton from "./OnyxSkeleton.vue";

const meta: Meta<typeof OnyxSkeleton> = {
  title: "components/OnyxSkeleton",
  ...defineStorybookActionsAndVModels({
    component: OnyxSkeleton,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSkeleton>;

export const Default = { args: {} } satisfies Story;
