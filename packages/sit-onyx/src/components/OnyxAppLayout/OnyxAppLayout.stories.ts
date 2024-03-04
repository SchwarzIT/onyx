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
      pageOverlay: {
        control: { disabled: true },
      },
      appOverlay: {
        control: { disabled: true },
      },
    },
    // storybook adds 1rem padding. The app layout fills the full available space
    // so we need to counteract the padding with a negative margin.
    decorators: [
      (story) => ({
        components: { story },
        template: `
          <div style="margin: -1rem;" >
            <story />
          </div>`,
      }),
    ],
    render: (args) => ({
      setup: () => ({ args }),
      components: { OnyxAppLayout },
      template: getAppTemplate(args.navBarAlignment === "left"),
    }),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxAppLayout>;

/** TODO */
export const Default = {
  args: {},
} satisfies Story;

/** TODO */
export const LeftNav = {
  args: {
    ...Default.args,
    navBarAlignment: "left",
  },
} satisfies Story;

/** TODO */
export const AppOverlay = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxAppLayout },
    template: getAppTemplate(
      args.navBarAlignment === "left",
      `<template #appOverlay>
          <div style="background-color: white; 
                      position: absolute;
                      inset: 10rem;
                      min-width: 5rem;
                      min-height: 1rem;">
            This is an overlay that covers the whole app.
          </div>
        </template>`,
    ),
  }),
} satisfies Story;

/** TODO */
export const PageOverlay = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxAppLayout },
    template: getAppTemplate(
      args.navBarAlignment === "left",
      `<template #pageOverlay>
          <div style="background-color: #ffffffC7;
                      backdrop-filter: blur(4px);
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      height: 100%;
                      align-items: center;">
            <div>This is an overlay that covers the page content.</div>
            <div>The nav bar is excluded.</div>
          </div>
        </template>`,
    ),
  }),
} satisfies Story;

const getAppTemplate = (alignNavLeft: boolean, otherSlotContent?: string): string => `
<OnyxAppLayout v-bind="args">
  <template #navBar>
    <div style="background-color: white; border: 1px solid lightgrey; ${
      alignNavLeft ? "height: 100%" : ""
    }">
      Nav bar
    </div>
  </template>
  <div>This is the page content.</div>
  ${otherSlotContent ?? ""}
</OnyxAppLayout>
`;
