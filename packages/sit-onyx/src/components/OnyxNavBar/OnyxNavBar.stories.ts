import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Decorator, Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import { Default as OnyxUserMenuDefault } from "../OnyxUserMenu/OnyxUserMenu.stories";
import OnyxUserMenu from "../OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

const meta: Meta<typeof OnyxNavBar> = {
  title: "components/NavBar",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavBar,
    events: ["appAreaClick", "backButtonClick"],
    argTypes: {
      default: { control: { disable: true } },
      contextArea: { control: { disable: true } },
      appArea: { control: { type: "text" } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavBar>;

export const Default = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavItem, { label: "Item", href: "/", active: true }),
      h(OnyxNavItem, { label: "Item", href: "/test" }, () => [
        "Item",
        h(OnyxBadge, { dot: true, variation: "warning" }),
      ]),
      h(OnyxNavItem, { label: "Item", href: "https://onyx.schwarz" }),
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
    contextArea: () => [
      h(OnyxTag, { label: "QA stage", color: "warning", icon: browserTerminal }),
      h(OnyxSeparator),
      h(OnyxUserMenu, OnyxUserMenuDefault.args),
    ],
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="margin-bottom: 16rem;"> <story /> </div>`,
    }),
  ] as Decorator[],
} satisfies Story;

/**
 * This example shows a navigation bar with custom app area content.
 */
export const WithCustomAppArea = {
  args: {
    ...Default.args,
    appArea: () => [h(OnyxIcon, { icon: placeholder, color: "secondary" }), "App name"],
  },
} satisfies Story;
