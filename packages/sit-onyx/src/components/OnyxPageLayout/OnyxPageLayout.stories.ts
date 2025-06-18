import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxPageLayout from "./OnyxPageLayout.vue";

/**
 * Layout component that structures a single page of the application.
 * Supports slots for common page elements like sidebar, page content and footer.
 *
 * Recommended to be used as root component on every page/view. Also see the [OnyxAppLayout](/docs/layout-applayout--docs).
 */
const meta: Meta<typeof OnyxPageLayout> = {
  title: "Layout/PageLayout",
  component: OnyxPageLayout,
  argTypes: {
    default: { control: { disable: true } },
    sidebar: { control: { disable: true } },
    footer: { control: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="font-family: var(--onyx-font-family); color: var(--onyx-color-text-icons-neutral-intense);" >
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxPageLayout>;

export const Default = {
  args: {
    default: () => "This is the page content.",
  },
} satisfies Story;

export const Sidebar = createAdvancedStoryExample(
  "OnyxPageLayout",
  "SidebarExample",
) satisfies Story;

export const SidebarRight = {
  ...createAdvancedStoryExample("OnyxPageLayout", "SidebarRightExample"),
} satisfies Story;

export const Footer = createAdvancedStoryExample("OnyxPageLayout", "FooterExample") satisfies Story;

export const SidebarAndFooter = createAdvancedStoryExample(
  "OnyxPageLayout",
  "SidebarAndFooterExample",
) satisfies Story;

export const SidebarWithPageFooter = createAdvancedStoryExample(
  "OnyxPageLayout",
  "SidebarWithPageFooterExample",
) satisfies Story;

export const Skeleton = createAdvancedStoryExample(
  "OnyxPageLayout",
  "SkeletonExample",
) satisfies Story;
