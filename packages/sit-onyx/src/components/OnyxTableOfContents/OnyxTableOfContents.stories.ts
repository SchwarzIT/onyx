import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxTableOfContentsItem from "../OnyxTableOfContentsItem/OnyxTableOfContentsItem.vue";
import OnyxTableOfContents from "./OnyxTableOfContents.vue";

/**
 * The table of contents component is used to display a list of sections/headings in a page with links to the corresponding sections.
 *
 * When integrating into a page layout, it is recommended to position it:
 * - right aligned
 * - fixed / does not scroll when the page content scrolls
 * - min width: 8rem
 * - max width: 15rem
 */
const meta: Meta<typeof OnyxTableOfContents> = {
  title: "Navigation/TableOfContents",
  component: OnyxTableOfContents,
  tags: ["unstable"],
  argTypes: {
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTableOfContents>;

export const Default = {
  args: {
    default: [
      h(OnyxTableOfContentsItem, { link: "#section-1" }, "Section 1"),
      h(
        OnyxTableOfContentsItem,
        { link: "#section-2" },
        {
          default: "Section 2",
          children: () => [
            h(OnyxTableOfContentsItem, { link: "#section-2-1" }, "Sub section 2.1"),
            h(OnyxTableOfContentsItem, { link: "#section-2-2" }, "Sub section 2.2"),
          ],
        },
      ),
      h(OnyxTableOfContentsItem, { link: "#section-3" }, "Section 3"),
    ],
  },
} satisfies Story;
