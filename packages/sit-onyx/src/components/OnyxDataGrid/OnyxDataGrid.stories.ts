import sort from "@sit-onyx/icons/sort.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import OnyxDataGrid from "./OnyxDataGrid.vue";

/**
 * For straightforward data presentation without the need for extensive interaction, the [OnyxTable](/docs/data-table--docs) is ideal. It offers a basic overview of the information without overwhelming users with complex features and is read only all the time.
 * On the other hand, if your dataset requires advanced functionalities such as advanced sorting, filtering, and editing, the `OnyxDataGrid` is the way to go. It provides robust tools for managing complex datasets.
 */
const meta: Meta<typeof OnyxDataGrid> = {
  title: "Data/DataGrid",
  component: OnyxDataGrid,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGrid>;

export const Default = {
  args: {
    columns: ["name", "age", "birthday"],
    data: [
      { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
      { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
      { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
    ],
  },
} satisfies Story;

export const MoreActions = {
  args: {
    columns: ["name", "age", "birthday"],
    features: [
      {
        name: Symbol("More actions"),
        watch: [],
        header: {
          actions: (column) =>
            column === "name"
              ? [
                  {
                    iconComponent: h(OnyxIconButton, {
                      label: "More actions",
                      icon: sort,
                      color: "neutral",
                    }),
                    listItems: [h(OnyxListItem, "No sorting"), h(OnyxListItem, "Random sort")],
                  },
                  {
                    iconComponent: h(OnyxIconButton, {
                      label: "More actions",
                      icon: sort,
                      color: "neutral",
                    }),
                    listItems: [
                      h(OnyxListItem, "Sort ascending"),
                      h(OnyxListItem, "Sort descending"),
                    ],
                  },
                ]
              : [],
        },
      },
    ],
    data: [
      { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
      { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
      { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
      { id: 4, name: "John", age: 28, birthday: new Date("2003-04-10") },
    ],
  },
} satisfies Story;
