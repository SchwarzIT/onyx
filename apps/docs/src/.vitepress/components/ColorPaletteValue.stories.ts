import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ColorPaletteValue from "./ColorPaletteValue.vue";

const meta: Meta<typeof ColorPaletteValue> = {
  title: "colors/ColorPaletteValue",
  component: ColorPaletteValue,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 12rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof ColorPaletteValue>;

export const Default = {
  args: {
    description: "Test description",
    color: "var(--onyx-color-base-primary-500)",
  },
} satisfies Story;

export const WithName = {
  args: {
    ...Default.args,
    color: "var(--onyx-color-base-neutral-500)",
    name: "default",
    textColor: "white",
  },
} satisfies Story;

export const WithBorder = {
  args: {
    ...Default.args,
    color: "var(--onyx-color-text-icons-neutral-inverse)",
    showBorder: true,
  },
} satisfies Story;
