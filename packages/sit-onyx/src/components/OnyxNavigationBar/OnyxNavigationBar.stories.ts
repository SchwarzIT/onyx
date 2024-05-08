import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import { Default as OnyxUserMenuDefault } from "../OnyxUserMenu/OnyxUserMenu.stories";
import OnyxUserMenu from "../OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavigationBar from "./OnyxNavigationBar.vue";
import onyxLogo from "./onyx-logo.svg";

const meta: Meta<typeof OnyxNavigationBar> = {
  title: "components/NavigationBar",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavigationBar,
    events: ["appAreaClick", "backButtonClick"],
    argTypes: {
      default: { control: { disable: true } },
      contextArea: { control: { disable: true } },
      logo: { control: { disable: true } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavigationBar>;

export const Default = {
  args: {
    logoUrl: onyxLogo,
    appName: "App name",
    default: () => [
      h(OnyxNavItem, { label: "Item", active: true }),
      h(OnyxNavItem, { label: "Item" }),
    ],
  },
} satisfies Story;

export const WithBackButton = {
  args: {
    ...Default.args,
    showBackButton: true,
  },
} satisfies Story;

export const WithContextArea = {
  args: {
    ...Default.args,
    contextArea: () => h(OnyxUserMenu, OnyxUserMenuDefault.args),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="margin-bottom: 16rem;"> <story /> </div>`,
    }),
  ],
} satisfies Story;
