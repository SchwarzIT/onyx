import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTypography, { type TypographyToken } from "./OnyxTypography.vue";

const meta: Meta<typeof OnyxTypography> = {
  title: "components/OnyxTypography",
  ...defineStorybookActionsAndVModels({
    component: OnyxTypography,
    events: [],
  }),
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
      { name: "paragraph-big", fontSize: "big", htmlTag: "p" },
      { name: "paragraph-default", fontSize: "default", htmlTag: "p" },
      { name: "paragraph-small", fontSize: "small", htmlTag: "p" },
    ],
    wideName: true,
  },
} satisfies Story;

export const Links = {
  args: {
    tokens: [
      { name: "link-big", fontSize: "big", htmlTag: "a" },
      { name: "link-default", fontSize: "default", htmlTag: "a" },
      { name: "link-small", fontSize: "small", htmlTag: "a" },
    ],
    wideName: true,
  },
} satisfies Story;
