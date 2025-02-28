import type { Meta, StoryObj } from "@storybook/vue3";
import WithTooltip from "./WithTooltip.vue";
import WithTooltipSourceCode from "./WithTooltip.vue?raw";

const meta: Meta<typeof WithTooltip> = {
  title: "Buttons/SystemButton/Examples",
  component: WithTooltip,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      source: {
        code: WithTooltipSourceCode.replace('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WithTooltip>;

export const Tooltip = { args: {} } satisfies Story;
