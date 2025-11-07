import { iconFilePdf } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxGlobalSearchOption from "./OnyxGlobalSearchOption.vue";

/**
 * Single option for the [OnyxGlobalSearch](/docs/search-filter-globalsearch--docs).
 */
const meta: Meta<typeof OnyxGlobalSearchOption> = {
  title: "Search & Filter/GlobalSearch/modules/GlobalSearchOption",
  component: OnyxGlobalSearchOption,
  tags: ["unstable"],
  argTypes: {
    trailing: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxGlobalSearchOption>;

export const Default = {
  args: {
    label: "Example option",
  },
} satisfies Story;

export const Link = {
  args: {
    label: "Example option",
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
  },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Default.args,
    icon: iconFilePdf,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...WithIcon.args,
    skeleton: true,
  },
} satisfies Story;

export const TrailingContent = {
  args: {
    ...Default.args,
    trailing: () => [
      h(OnyxTag, { label: "Information", color: "info", density: "compact" }),
      h(
        OnyxFlyoutMenu,
        { label: "Custom actions", trigger: "click" },
        {
          options: () => [
            h(OnyxMenuItem, { label: "Action 1" }),
            h(OnyxMenuItem, { label: "Action 2" }),
            h(OnyxMenuItem, { label: "Action 3" }),
          ],
        },
      ),
    ],
  },
} satisfies Story;
