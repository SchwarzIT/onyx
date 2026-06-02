import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
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
              { label: "Item 1", icon: iconPlaceholder },
              {
                default: () => [
                  h(
                    OnyxTreeViewItem,
                    { label: "Item 1.1", icon: iconPlaceholder },
                    {
                      default: () => [
                        h(OnyxTreeViewItem, { label: "Item 1.1.1", icon: iconPlaceholder }),
                        h(OnyxTreeViewItem, { label: "Item 1.1.2", icon: iconPlaceholder }),
                      ],
                    },
                  ),
                  h(
                    OnyxTreeViewItem,
                    { label: "Item 1.2", icon: iconPlaceholder },
                    {
                      default: () => [
                        h(OnyxTreeViewItem, { label: "Item 1.2.1", icon: iconPlaceholder }),
                        h(OnyxTreeViewItem, { label: "Item 1.2.2", icon: iconPlaceholder }),
                      ],
                    },
                  ),
                ],
              },
            ),

            h(
              OnyxTreeViewItem,
              { label: "Item 2", icon: iconPlaceholder },
              {
                default: () => [
                  h(
                    OnyxTreeViewItem,
                    { label: "Item 2.1", icon: iconPlaceholder },
                    {
                      default: () => [
                        h(OnyxTreeViewItem, { label: "Item 2.1.1", icon: iconPlaceholder }),
                        h(OnyxTreeViewItem, { label: "Item 2.1.2", icon: iconPlaceholder }),
                      ],
                    },
                  ),
                  h(OnyxTreeViewItem, { label: "Item 2.2", icon: iconPlaceholder }),
                ],
              },
            ),

            h(
              OnyxTreeViewItem,
              { label: "Item 3", disabled: true, icon: iconPlaceholder },
              {
                default: () => [h(OnyxTreeViewItem, { label: "Item 3.1", icon: iconPlaceholder })],
              },
            ),
          ],
        }),
      ]);
  },
};
