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
    decorators: [
      (story) => ({
        components: { story },
        template: `
          <div id="app-layout-wrapper" style="margin: -1rem; position: relative" >
            <story />
          </div>`,
      }),
    ],
    render: (args) => ({
      setup: () => ({ args }),
      components: { OnyxAppLayout },
      template: `
        <OnyxAppLayout v-bind="args">
          <template #navBar>
            <div style="background-color: white; border: 1px solid lightgrey; ${
              args.navBarAlignment === "left" ? "height: 100%" : ""
            }">
              Nav bar
            </div>
          </template>
          <div>This is the page content.</div>
        </OnyxAppLayout>
        `,
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
export const withOverlay = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    components: { OnyxAppLayout },
    template: `
      <OnyxAppLayout v-bind="args">
        <template #navBar>
          <div style="background-color: white; border: 1px solid lightgrey;">
            This is the nav bar.
          </div>
        </template>
        <div>This is the page content.</div>
        <template #overlay>
          <div style="background-color: white; 
                      position: absolute;
                      inset: 10rem;
                      min-width: 5rem;
                      min-height: 1rem;">
            This is an overlay.
          </div>
        </template>
      </OnyxAppLayout>
    `,
  }),
} satisfies Story;
