import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";

const meta: Meta<typeof OnyxDataGridRenderer> = {
  title: "Support/DataGridRenderer",
  component: OnyxDataGridRenderer,
};

export default meta;
type Story = StoryObj<typeof OnyxDataGridRenderer>;

export const Default = { args: {} } satisfies Story;
