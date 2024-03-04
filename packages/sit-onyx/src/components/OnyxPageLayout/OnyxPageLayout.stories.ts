import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxPageLayout from "./OnyxPageLayout.vue";

/** TODO */
const meta: Meta<typeof OnyxPageLayout> = {
  title: "layout component/OnyxPageLayout",
  ...defineStorybookActionsAndVModels({
    component: OnyxPageLayout,
    events: [],
    argTypes: {
      default: {
        control: { disabled: true },
      },
      sidebar: {
        control: { disabled: true },
      },
      footer: {
        control: { disabled: true },
      },
      mainOverlay: {
        control: { disabled: true },
      },
      toasts: {
        control: { disabled: true },
      },
    },
  }),
  // storybook adds 1rem padding. The app layout fills the full available space
  // so we need to counteract the padding with a negative margin.
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="margin: -1rem; height: 20rem;" >
          <story />
        </div>`,
    }),
  ],
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent(),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxPageLayout>;

/** TODO */
export const Default = {
  args: {},
} satisfies Story;

/** TODO */
export const WithSidebar = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent({ sidebar: true }),
  }),
} satisfies Story;

/** TODO */
export const WithFooter = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent({ footer: true }),
  }),
} satisfies Story;

/** TODO */
export const WithPartialFooter = {
  args: {
    ...Default.args,
    footerAsideSidebar: true,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent({ sidebar: true, footer: true }),
  }),
} satisfies Story;

// /** TODO */
// export const WithOverlaySidebar = {
//   args: {
//     ...Default.args,
//     sidebar: () => "Sidebar",
//     footer: () => "Footer",
//   },
// } satisfies Story;

const getPageRenderContent = (
  options?: { sidebar?: boolean; footer?: boolean },
  otherSlotContent?: string,
) => ({
  components: { OnyxPageLayout },
  template: `
  <OnyxPageLayout v-bind="args">
    ${
      options?.sidebar
        ? `<template #sidebar>
            <div style="height: 100%; border: 1px solid lightgrey;">
            Side Bar Content
            </div>
           </template>`
        : ""
    }
    <div>This is the page content.</div>
    ${
      options?.footer
        ? `<template #footer>
            <div style="border: 1px solid lightgrey;">
              Footer Content
            </div>
           </template>`
        : ""
    }
    ${otherSlotContent ?? ""}
  </OnyxPageLayout>
`,
});
