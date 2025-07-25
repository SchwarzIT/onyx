import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTypography, { type TypographyVariable } from "./OnyxTypography.vue";

const meta: Meta<typeof OnyxTypography> = {
  title: "OnyxTypography",
  component: OnyxTypography,
};

export default meta;
type Story = StoryObj<typeof OnyxTypography>;

export const Headlines = {
  args: {
    variables: Array.from<unknown, TypographyVariable>({ length: 6 }, (_, index) => {
      const name = `h${index + 1}`;
      return { name, htmlTag: name as TypographyVariable["htmlTag"] };
    }),
  },
} satisfies Story;

export const Paragraphs = {
  args: {
    variables: [
      { name: "paragraph-big", textSize: "large", htmlTag: "p" },
      { name: "paragraph-default", textSize: "default", htmlTag: "p" },
      { name: "paragraph-small", textSize: "small", htmlTag: "p" },
    ],
    wideName: true,
  },
} satisfies Story;

export const Links = {
  args: {
    variables: [
      { name: "link-big", textSize: "large", htmlTag: "a" },
      { name: "link-default", textSize: "default", htmlTag: "a" },
      { name: "link-small", textSize: "small", htmlTag: "a" },
    ],
    wideName: true,
  },
} satisfies Story;
