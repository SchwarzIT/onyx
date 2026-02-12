import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTextEditor from "./OnyxTextEditor.vue";

const meta: Meta<typeof OnyxTextEditor> = {
  title: "TextEditor",
  component: OnyxTextEditor,
  argTypes: {
    toolbar: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTextEditor>;

export const Default = {
  args: {
    label: "Example editor",
  },
} satisfies Story;

export const BottomToolbar = {
  args: {
    ...Default.args,
    toolbar: { position: "bottom" },
  },
} satisfies Story;

export const InitialValue = {
  args: {
    ...Default.args,
    modelValue: `<p><strong>This</strong> is <em>example</em> <a target="_blank" rel="noopener noreferrer nofollow" href="https://onyx.schwarz">content</a> <u>for</u> <s><u>testing</u></s>.</p><p></p><ol><li><p>A</p></li><li><p>B</p></li></ol><p></p><ul><li><p>C</p></li><li><p>D</p></li></ul><p></p><h1>Headline 1</h1><p></p><h2>Headline 2</h2><p></p><h3>Headline 3</h3><p></p><h4>Headline 4</h4><p></p><h5>Headline 5</h5><p></p><h6>Headline 6</h6><p></p><p style="text-align: left;">Left aligned</p><p style="text-align: center;">Centered</p><p style="text-align: right;">Right aligned</p><p style="text-align: justify;">Block aligned</p><p style="text-align: justify;"></p><blockquote><p style="text-align: justify;">Blockquote</p></blockquote><p></p>`,
  },
} satisfies Story;
