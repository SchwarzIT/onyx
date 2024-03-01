import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxAppLayout from "./OnyxAppLayout.vue";

/** TODO */
const meta: Meta<typeof OnyxAppLayout> = {
  title: "layout component/OnyxAppLayout",
  ...defineStorybookActionsAndVModels({
    component: OnyxAppLayout,
    events: [],
    argTypes: {
      navBar: {
        control: { disabled: true },
      },
      default: {
        control: { disabled: true },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxAppLayout>;

/** TODO */
export const Default = {
  args: {
    navBar: () => "Nav",
    default: () => "Page content",
  },
} satisfies Story;

/** TODO */
export const LeftNav = {
  args: {
    ...Default.args,
    navBarAlignment: "left",
  },
};
/** TODO */
export const withOverlay = {
  args: {
    ...Default.args,
    overlay: () => "Overlay",
  },
};
