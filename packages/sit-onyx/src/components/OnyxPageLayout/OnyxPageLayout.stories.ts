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
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxPageLayout>;

/** TODO */
export const Default = {
  args: {
    default: () => "Page content",
  },
} satisfies Story;

/** TODO */
export const WithSidebar = {
  args: {
    ...Default.args,
    sidebar: () => "Sidebar",
  },
} satisfies Story;

/** TODO */
export const WithFooter = {
  args: {
    ...Default.args,
    footer: () => "Footer",
  },
} satisfies Story;

/** TODO */
export const WithCollapsibleSidebar = {
  args: {
    ...Default.args,
    sidebar: () => "Sidebar",
    footer: () => "Footer",
    sidebarBehavior: "collapsible",
    footerBehavior: "main",
  },
} satisfies Story;

// /** TODO overlays all of storybook. bad idea. */
// export const WithOverlaySidebar = {
//   args: {
//     ...Default.args,
//     sidebar: () => "Sidebar",
//     footer: () => "Footer",
//     sidebarBehavior: "overlay",
//   },
// } satisfies Story;
