import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType } from "../../utils/storybook";
import OnyxInfoBanner from "./OnyxInfoBanner.vue";

const meta: Meta<typeof OnyxInfoBanner> = {
  title: "Support/InfoBanner",
  component: OnyxInfoBanner,
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="padding: 4rem 6rem;">
          <story />
        </div>`,
    }),
  ],
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxInfoBanner>;

export const Default = {
  args: {
    description: "Info banner text",
    color: "neutral",
    type: "cozy",
  },
} satisfies Story;

export const CompactType = {
  args: {
    description: "Info banner text",
    color: "neutral",
    type: "compact",
    closable: true,
  },
} satisfies Story;

export const ClosableBanner = {
  args: {
    title: "Example Info Banner Headline",
    description: "Info banner text",
    color: "success",
    closable: true,
  },
} satisfies Story;

export const BannerWithIcon = {
  args: {
    description: "Info banner text",
    color: "neutral",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.25 6h1.5v1.5h-1.5zm1.5 3.75h-1.5V18h1.5z"/><path fill-rule="evenodd" d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21M12 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9" clip-rule="evenodd"/></svg>',
  },
} satisfies Story;

export const CompleteExample = {
  args: {
    title: "Example Info Banner Headline",
    description: "Info banner text",
    closable: true,
    hasAction: true,
    buttonText: "More",
    color: "danger",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.25 6h1.5v1.5h-1.5zm1.5 3.75h-1.5V18h1.5z"/><path fill-rule="evenodd" d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21M12 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9" clip-rule="evenodd"/></svg>',
  },
} satisfies Story;
