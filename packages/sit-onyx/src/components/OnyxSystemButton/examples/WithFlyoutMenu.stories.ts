import type { Meta, StoryObj } from "@storybook/vue3";
import WithFlyoutMenu from "./WithFlyoutMenu.vue";
import WithFlyoutMenuSourceCode from "./WithFlyoutMenu.vue?raw";

const meta: Meta<typeof WithFlyoutMenu> = {
  title: "Buttons/SystemButton/Examples",
  component: WithFlyoutMenu,
  tags: ["!autodocs"],
  parameters: {
    docs: {
      source: {
        code: WithFlyoutMenuSourceCode.replace('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="height: 16rem;">
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof WithFlyoutMenu>;

export const FlyoutMenu = { args: {} } satisfies Story;
