import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxSidebarItem from "../OnyxSidebar/modules/OnyxSidebarItem/OnyxSidebarItem.vue";
import OnyxTreeViewItem from "../OnyxTreeViewItem/OnyxTreeViewItem.vue";
import OnyxTreeView from "./OnyxTreeView.vue";

const meta: Meta<typeof OnyxTreeView> = {
  title: "Navigation/TreeView",
  component: OnyxTreeView,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxTreeView>;

export const Default: Story = {
  render: (args) => {
    return () =>
      h("div", [
        h(OnyxTreeView, args, {
          default: () => [
            h(
              OnyxTreeViewItem,
              { label: "Documents" },
              {
                default: () => [
                  h(
                    OnyxTreeViewItem,
                    { label: "Invoices" },
                    {
                      default: () => [
                        h(OnyxTreeViewItem, { label: "Invoice_January.pdf" }),
                        h(OnyxTreeViewItem, { label: "Invoice_February.pdf" }),
                      ],
                    },
                  ),
                  h(
                    OnyxTreeViewItem,
                    { label: "Contracts" },
                    {
                      default: () => [
                        h(OnyxTreeViewItem, { label: "Employment_Contract.pdf", active: true }),
                        h(OnyxTreeViewItem, { label: "Rental_Agreement.pdf" }),
                      ],
                    },
                  ),
                ],
              },
            ),

            h(
              OnyxTreeViewItem,
              { label: "Images" },
              {
                default: () => [
                  h(
                    OnyxTreeViewItem,
                    { label: "Vacation_2025" },
                    {
                      default: () => [
                        h(OnyxTreeViewItem, { label: "Beach.png" }),
                        h(OnyxTreeViewItem, { label: "Mountains.jpg" }),
                      ],
                    },
                  ),
                  h(OnyxSidebarItem, { link: "#" }, { default: () => "SidebarItem" }),
                ],
              },
            ),

            h(
              OnyxTreeViewItem,
              { label: "System Settings", disabled: true },
              {
                default: () => [h(OnyxTreeViewItem, { label: "Security" })],
              },
            ),
          ],
        }),
      ]);
  },
};
