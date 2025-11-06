import { iconFilePdf } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxGlobalSearchOption from "../OnyxGlobalSearchOption/OnyxGlobalSearchOption.vue";
import OnyxGlobalSearchGroup from "./OnyxGlobalSearchGroup.vue";

/**
 * A group of options for the [OnyxGlobalSearch](/docs/search-filter-globalsearch--docs).
 */
const meta: Meta<typeof OnyxGlobalSearchGroup> = {
  title: "Search & Filter/GlobalSearch/modules/GlobalSearchGroup",
  component: OnyxGlobalSearchGroup,
  tags: ["unstable"],
  argTypes: {
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxGlobalSearchGroup>;

export const Default = {
  args: {
    label: "Search results",
    default: () => [
      h(OnyxGlobalSearchOption, { label: "Result 1", icon: iconFilePdf }),
      h(OnyxGlobalSearchOption, { label: "Result 2", icon: iconFilePdf }),
      h(OnyxGlobalSearchOption, { label: "Result 3", icon: iconFilePdf }),
    ],
  },
} satisfies Story;
