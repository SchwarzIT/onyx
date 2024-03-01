import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxIconLibrary from "./OnyxIconLibrary.vue";

const meta: Meta<typeof OnyxIconLibrary> = {
  title: "Icon library/OnyxIconLibrary",
  ...defineStorybookActionsAndVModels({
    component: OnyxIconLibrary,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxIconLibrary>;

export const Default = { args: {} } satisfies Story;
