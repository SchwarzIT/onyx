import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxCard from "../../OnyxCard/OnyxCard.vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import IconCardExample from "./IconCardExample.vue";
import IconCardExampleCode from "./IconCardExample.vue?raw";
import ImageCardExample from "./ImageCardExample.vue";
import ImageCardExampleCode from "./ImageCardExample.vue?raw";

const meta: Meta<typeof OnyxCard> = {
  title: "Basic/Card/Examples",
  component: OnyxCard,
  tags: ["!autodocs"],
  argTypes: {
    style: { table: { disable: true } },
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCard>;

export const HeadlineAndText = {
  args: {
    style: "width: 20rem;",
    default: [
      h(OnyxHeadline, { is: "h2" }, () => "Example headline"),
      "Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat. Vel nec aliquet lorem turpis eu dui. At pellentesque senectus sed volutpat vitae nulla. Nisl cursus dignissim sed eget neque tristique interdum pretium elit.",
    ],
  },
} satisfies Story;

export const ImageCard = {
  render: () => ({
    components: { ImageCardExample },
    template: `<ImageCardExample />`,
  }),
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: ImageCardExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
} satisfies Story;

export const IconCard = {
  render: () => ({
    components: { IconCardExample },
    template: `<IconCardExample />`,
  }),
  parameters: {
    docs: {
      source: {
        // Removes the comment enclosed block to simplify the source example
        code: IconCardExampleCode.replaceAll('from "../../.."', 'from "sit-onyx"'),
      },
    },
  },
} satisfies Story;
