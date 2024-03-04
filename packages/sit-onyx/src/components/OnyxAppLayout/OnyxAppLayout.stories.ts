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
          <template #navBar><div style="background-color: white">nav bar</div></template>
          <div>Page content</div>
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
        <template #navBar><div style="background-color: white">This is the nav bar.</div></template>
        <div>This is the page content.</div>
        <template #overlay><span style="background-color: white">This is an overlay.</span></template>
      </OnyxAppLayout>
      `,
  }),
} satisfies Story;
