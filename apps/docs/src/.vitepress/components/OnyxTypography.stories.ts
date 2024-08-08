import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTypography, { type TypographyToken } from "./OnyxTypography.vue";

const meta: Meta<typeof OnyxTypography> = {
  title: "OnyxTypography",
  component: OnyxTypography,
};

export default meta;
type Story = StoryObj<typeof OnyxTypography>;

export const Headlines = {
  args: {
    tokens: Array.from<unknown, TypographyToken>({ length: 6 }, (_, index) => {
      const name = `h${index + 1}`;
      return { name, htmlTag: name as TypographyToken["htmlTag"] };
    }),
  },
} satisfies Story;

export const Paragraphs = {
  args: {
    tokens: [
      { name: "paragraph-big", textSize: "large", htmlTag: "p" },
      { name: "paragraph-default", textSize: "default", htmlTag: "p" },
      { name: "paragraph-small", textSize: "small", htmlTag: "p" },
    ],
    wideName: true,
  },
} satisfies Story;

export const Links = {
  args: {
    tokens: [
      { name: "link-big", textSize: "large", htmlTag: "a" },
      { name: "link-default", textSize: "default", htmlTag: "a" },
      { name: "link-small", textSize: "small", htmlTag: "a" },
    ],
    wideName: true,
  },
} satisfies Story;
