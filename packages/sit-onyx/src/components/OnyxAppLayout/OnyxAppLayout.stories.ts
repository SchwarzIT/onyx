import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxAppLayout from "./OnyxAppLayout.vue";

/**
 * Layout component that structures your application.
 * Includes slots for a nav bar, page content, and overlays above the page or the whole app.
 * Recommended to use on App.vue level of an application.
 */
const meta: Meta<typeof OnyxAppLayout> = {
  title: "layout/OnyxAppLayout",
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
      ...getAppTemplate(args.navBarAlignment === "left"),
    }),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxAppLayout>;

/** Standard app layout with a nav bar and some content. */
export const Default = {
  args: {},
} satisfies Story;

/** App layout where the nav bar is left aligned. */
export const LeftNav = {
  args: {
    ...Default.args,
    navBarAlignment: "left",
  },
} satisfies Story;

/** Example of an overlay that covers the whole application. */
export const AppOverlay = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getAppTemplate(
      args.navBarAlignment === "left",
      `<template #appOverlay>
          <div style="background-color: var(--onyx-color-base-background-tinted);
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

/** Example of an overlay that covers the whole page section of an application. */
export const PageOverlay = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getAppTemplate(
      args.navBarAlignment === "left",
      `<template #pageOverlay>
          <div style="backdrop-filter: blur(4px);
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

const getAppTemplate = (alignNavLeft: boolean, otherSlotContent?: string) => ({
  components: { OnyxAppLayout },
  template: `
<OnyxAppLayout v-bind="args">
  <template #navBar>
    <div style="border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300); 
                ${alignNavLeft ? "height: 100%" : ""}">
      Nav bar
    </div>
  </template>
  <div>This is the page content.</div>
  ${otherSlotContent ?? ""}
</OnyxAppLayout>
`,
});
