import type { Meta } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook";
import OnyxTable from "../../OnyxTable/OnyxTable.vue";

const meta: Meta<typeof OnyxTable> = {
  title: "Data/Table/Examples",
  component: OnyxTable,
  tags: ["!autodocs"],
  argTypes: {
    style: { table: { disable: true } },
    default: { control: { disable: true } },
  },
};

export default meta;

export const Skeleton = createAdvancedStoryExample("OnyxTable", "OnyxTableSkeletonExample");
