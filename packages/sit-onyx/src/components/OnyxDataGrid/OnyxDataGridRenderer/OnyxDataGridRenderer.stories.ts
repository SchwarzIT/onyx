import type { Meta, StoryObj } from "@storybook/vue3";
import { h, type FunctionalComponent, type HTMLAttributes } from "vue";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";

const meta: Meta<typeof OnyxDataGridRenderer> = {
  title: "Support/DataGridRenderer",
  component: OnyxDataGridRenderer,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGridRenderer>;

const ExampleHeader: FunctionalComponent<HTMLAttributes> = (props) => h("span", props.title);

export const Default = {
  args: {
    columns: [
      {
        key: "column-1",
        component: ExampleHeader,
        props: {
          title: "Column 1",
        },
      },
      {
        key: "column-2",
        component: ExampleHeader,
        props: {
          title: "Column 2",
        },
      },
    ],
    rows: Array.from({ length: 10 }, (_, index) => {
      const id = index + 1;

      return {
        id: `row-${id}`,
        cells: {
          "column-1": {
            component: (props) => h("span", props.row.id.toString()),
            props: {
              row: {
                id: `Row ${id}, cell 1`,
              },
            },
          },
          "column-2": {
            component: (props) => h("span", props.row.id.toString()),
            props: {
              row: {
                id: `Row ${id}, cell 2`,
              },
            },
          },
        },
      };
    }),
  },
} satisfies Story;
