import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxPagination from "../OnyxPagination/OnyxPagination.vue";
import OnyxTable from "./OnyxTable.vue";

/**
 * OnyxTable is used for presenting data in a table structure.
 */
const meta: Meta<typeof OnyxTable> = {
  title: "Data/Table",
  component: OnyxTable,
  argTypes: {
    default: { control: { disable: true } },
    head: { control: { disable: true } },
    empty: { control: { disable: true } },
    headline: { control: { disable: true } },
    actions: { control: { disable: true } },
    pagination: { control: { disable: true } },
    bottomLeft: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTable>;

const getTableHeaderRow = () =>
  h("tr", [
    h("th", "Fruit"),
    h("th", "Price (€/kg)"),
    h("th", "Inventory (kg)"),
    h("th", "Inventory (pieces)"),
    h("th", "Rating"),
  ]);

const getTableBodyRows = () => [
  h("tr", [h("td", "Strawberry"), h("td", "4.50"), h("td", "200"), h("td", "100"), h("td", "5")]),
  h("tr", [h("td", "Apple"), h("td", "1.99"), h("td", "3000"), h("td", "200"), h("td", "3")]),
  h("tr", [h("td", "Banana"), h("td", "3.75"), h("td", "18000"), h("td", "300"), h("td", "4")]),
];

/**
 * This example shows a default table.
 */
export const Default = {
  args: {
    default: () => getTableBodyRows(),
    head: () => getTableHeaderRow(),
  },
} satisfies Story;

/**
 * This example shows a striped table.
 */
export const Striped = {
  args: {
    ...Default.args,
    striped: true,
  },
} satisfies Story;

/**
 * This example shows a table with additional verticals borders (horizontal borders are always shown).
 */
export const VerticalBorders = {
  args: {
    ...Default.args,
    withVerticalBorders: true,
  },
} satisfies Story;

export const WithSlots = {
  args: {
    ...Default.args,
    headline: h(OnyxHeadline, { is: "h3" }, [
      "All items ",
      h(
        "span",
        { style: "color: var(--onyx-color-text-icons-neutral-soft)" },
        `(${Default.args.default().length})`,
      ),
    ]),
    actions: [
      h(OnyxIconButton, { icon: placeholder, label: "Example action" }),
      h(OnyxIconButton, { icon: placeholder, label: "Example action" }),
    ],
    pagination: h(OnyxPagination, { modelValue: 1, pages: 42 }),
    bottomLeft: h(
      "span",
      { style: "color: var(--onyx-color-text-icons-neutral-soft)" },
      "Custom content...",
    ),
  },
} satisfies Story;

/**
 * This example shows a table with column groups that can be used to group related columns together.
 * Note that the `withVerticalBorders` property should be used with column groups.
 */
export const ColumnGroups = {
  args: {
    ...VerticalBorders.args,
    columnGroups: [
      {
        key: "general",
        span: 2,
        header: "General",
      },
      {
        key: "inventory",
        span: 2,
        header: "Inventory",
      },
      {
        key: "rest",
        span: 1,
      },
    ],
  },
} satisfies Story;

/**
 * This example shows a table without a header.
 */
export const WithoutHeader = {
  args: {
    default: Default.args.default,
  },
} satisfies Story;

/**
 * This example shows a table which has a vertical scroll bar.
 */
export const LimitedHeight = {
  args: {
    style: "max-height: 16rem",
    head: Default.args.head,
    default: () => [...getTableBodyRows(), ...getTableBodyRows(), ...getTableBodyRows()],
  },
} satisfies Story;

/**
 * This example shows a table which has a horizontal scroll bar.
 */
export const LimitedWidth = {
  args: {
    ...LimitedHeight.args,
    style: "max-width: 20rem",
  },
} satisfies Story;

/**
 * This example shows a table which has a vertical and horizontal scroll bar.
 */
export const LimitedHeightAndWidth = {
  args: {
    ...LimitedHeight.args,
    style: "max-width: 20rem; max-height: 16rem",
  },
} satisfies Story;

/**
 * This example shows a table without a `tbody`.
 */
export const Empty = {
  args: {
    head: () => getTableHeaderRow(),
  },
} satisfies Story;
