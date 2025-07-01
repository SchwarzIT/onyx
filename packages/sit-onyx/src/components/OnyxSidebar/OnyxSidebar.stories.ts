import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxSidebar from "./OnyxSidebar.vue";

const meta: Meta<typeof OnyxSidebar> = {
  title: "Navigation/Sidebar",
  component: OnyxSidebar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    header: { control: { disable: true } },
    footer: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSidebar>;

export const Default = createAdvancedStoryExample("OnyxSidebar", "DefaultExample") satisfies Story;

export const Drawer = createAdvancedStoryExample("OnyxSidebar", "DrawerExample") satisfies Story;

export const Resizable = {
  ...createAdvancedStoryExample("OnyxSidebar", "ResizeExample"),
} satisfies Story;

export const Grid = {
  tags: ["new:feature"],
  ...createAdvancedStoryExample("OnyxSidebar", "GridExample"),
} satisfies Story;

export const Right = {
  ...createAdvancedStoryExample("OnyxSidebar", "RightExample"),
} satisfies Story;
