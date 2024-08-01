import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Primary as ButtonPrimaryArgs } from "../OnyxButton/OnyxButton.stories";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxRipple from "./OnyxRipple.vue";

/**
 * OnyxRipple provides visual feedback when a user interacts with the component. Supporting both touch and mouse events.
 *
 * A standalone OnyxRipple does not show any ripples, since the events have to be handled on the parent component. See `OnyxButton` how to do that.
 */
const meta: Meta<typeof OnyxRipple> = {
  title: "Support/Ripple",
  ...defineStorybookActionsAndVModels({
    component: OnyxButton,
    events: ["click"],
    parameters: undefined,
  }),
};

export default meta;

type Story = StoryObj<typeof OnyxButton>;

/**
 * Example usage of OnyxRipple inside OnyxButton
 */
export const Default = {
  ...ButtonPrimaryArgs,
} satisfies Story;
