import { iconFolderPlus } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxMillerColumn from "./OnyxMillerColumn.vue";
import OnyxMillerItem from "./modules/OnyxMillerItem/OnyxMillerItem.vue";
import OnyxMillerPane from "./modules/OnyxMillerPane/OnyxMillerPane.vue";

const meta: Meta<typeof OnyxMillerColumn> = {
  title: "Navigation/MillerColumn",
  component: OnyxMillerColumn,
  argTypes: {
    default: { control: { disable: true } },
  },
  args: {
    density: "default",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxMillerColumn>;

export const Default = {
  args: {
    default: () => [
      h(
        OnyxMillerPane,
        { label: "Item Type", labelIcon: iconFolderPlus },
        {
          default: () => [
            h(OnyxMillerItem, {
              label: "Unassigned",
              count: 5,
              arrow: true,
              dot: true,
              dotColor: "red",
            }),
            h(OnyxMillerItem, { label: "Sweets", count: 42, arrow: true, active: true }),
            h(OnyxMillerItem, { label: "Vegetables", arrow: true }),
            h(OnyxMillerItem, { label: "Fruit", arrow: true }),
            h(OnyxMillerItem, { label: "Fish", arrow: true }),
            h(OnyxMillerItem, { label: "Frozen Food" }),
            h(OnyxMillerItem, { label: "Dairy Products" }),
            h(OnyxMillerItem, { label: "Bakery & Pastry" }),
            h(OnyxMillerItem, { label: "Beverages" }),
            h(OnyxMillerItem, { label: "Promotional Goods" }),
          ],
        },
      ),
      h(
        OnyxMillerPane,
        { label: "Product Group" },
        {
          default: () => [
            h(OnyxMillerItem, { label: "Chocolate Balls", arrow: true }),
            h(OnyxMillerItem, { label: "Cookies & Biscuits", arrow: true }),
            h(OnyxMillerItem, { label: "Chocolate Bars", arrow: true, active: true }),
            h(OnyxMillerItem, { label: "Gummy Bears", arrow: true }),
            h(OnyxMillerItem, { label: "Wafers" }),
            h(OnyxMillerItem, { label: "Chewing Gum" }),
          ],
        },
      ),
      h(
        OnyxMillerPane,
        { label: "Brand" },
        {
          default: () => [
            h(OnyxMillerItem, { label: "M&M's", arrow: true }),
            h(OnyxMillerItem, { label: "Kinder", arrow: true }),
            h(OnyxMillerItem, { label: "Snickers", arrow: true }),
            h(OnyxMillerItem, { label: "Milka", arrow: true, active: true }),
            h(OnyxMillerItem, { label: "KitKat", arrow: true }),
          ],
        },
      ),
      h(
        OnyxMillerPane,
        { label: "Variety" },
        {
          default: () => [
            h(OnyxMillerItem, { label: "Crispy", arrow: true }),
            h(OnyxMillerItem, { label: "Hazelnut", arrow: true, active: true }),
            h(OnyxMillerItem, { label: "Milk Cream Fill", arrow: true }),
            h(OnyxMillerItem, { label: "Dark Chocolate", arrow: true }),
            h(OnyxMillerItem, { label: "Caramel Fudge" }),
          ],
        },
      ),
      h(
        OnyxMillerPane,
        { label: "Container Size" },
        {
          default: () => [
            h(OnyxMillerItem, { label: "Small (100g)" }),
            h(OnyxMillerItem, { label: "Medium (250g)", active: true }),
            h(OnyxMillerItem, { label: "Large (500g)" }),
            h(OnyxMillerItem, { label: "Family Pack (1kg)" }),
            h(OnyxMillerItem, { label: "Bulk Container" }),
          ],
        },
      ),
    ],
  },
} satisfies Story;
