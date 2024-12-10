import type { Meta, StoryObj } from "@storybook/vue3";
import WithTooltip from "./WithTooltip.vue";
import WithTooltipSourceCode from "./WithTooltip.vue?raw";

const meta: Meta<typeof WithTooltip> = {
  title: "Buttons/SystemButton/Examples/Tooltip",
  component: WithTooltip,
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

export const Default = { args: {} } satisfies Story;
