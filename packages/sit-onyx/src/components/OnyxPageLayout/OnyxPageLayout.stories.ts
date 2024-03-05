import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxPageLayout from "./OnyxPageLayout.vue";

/**
 * Layout component that structures your page.
 * Includes slots for a sidebar, page content, footer and notifications.
 * Recommended to use on view/page level of an application.
 */
const meta: Meta<typeof OnyxPageLayout> = {
  title: "layout/OnyxPageLayout",
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
        <div style="margin: -1rem; height: 20rem; 
                    font-family: var(--onyx-font-family); 
                    color: var(--onyx-color-text-icons-neutral-intense);" >
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

/** A standard page with some content. */
export const Default = {
  args: {},
} satisfies Story;

/** A standard page with a fixed sidebar. */
export const WithSidebar = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent({ sidebar: true }),
  }),
} satisfies Story;

/** A standard page with a footer. */
export const WithFooter = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent({ footer: true }),
  }),
} satisfies Story;

/** A page that shows a sidebar and a footer next to it. */
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

/** A page that shows a toast. */
export const WithToast = {
  args: {
    ...Default.args,
    footerAsideSidebar: true,
  },
  render: (args) => ({
    setup: () => ({ args }),
    ...getPageRenderContent(
      { sidebar: true, footer: true },
      `
    <template #toasts>
      <div style="display: flex;
                  justify-content: center;
                  width: 90%;  
                  background-color: var(--onyx-color-base-neutral-900);
                  opacity: 0.9;
                  color: white;
                  margin: auto;">
        This is the place for a toast
      </div>
    </template>
    `,
    ),
  }),
} satisfies Story;

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
            <div style="height: 100%; border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);">
            Side Bar Content
            </div>
           </template>`
        : ""
    }
    <div>This is the page content.</div>
    ${
      options?.footer
        ? `<template #footer>
            <div style="border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);">
              Footer Content
            </div>
           </template>`
        : ""
    }
    ${otherSlotContent ?? ""}
  </OnyxPageLayout>
`,
});
