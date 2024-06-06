import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Decorator, Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";

import { ONYX_BREAKPOINTS } from "../../types";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxTimer from "../OnyxTimer/OnyxTimer.vue";
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
      mobileBreakpoint: {
        options: Object.keys(ONYX_BREAKPOINTS),
        control: {
          labels: Object.entries(ONYX_BREAKPOINTS).reduce<Record<string, string>>(
            (labels, [name, width]) => {
              labels[name] = `${name} (${width}px)`;
              return labels;
            },
            {},
          ),
        },
      },
    },
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="margin-bottom: 10rem;"> <story /> </div>`,
      }),
    ] as Decorator[],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavBar>;

export const Default = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavItem, { label: "Item", href: "/" }),
      h(
        OnyxNavItem,
        {
          label: "Item",
          href: "/test",
          options: [
            { label: "Nested item 1", href: "#" },
            { label: "Nested item 2", href: "#", active: true },
            { label: "Nested item 3", href: "#" },
          ],
        },
        () => ["Item", h(OnyxBadge, { dot: true, color: "warning" })],
      ),
      h(OnyxNavItem, { label: "Item", href: "https://onyx.schwarz" }),
    ],
  },
} satisfies Story;

export const WithBackButton = {
  args: {
    ...Default.args,
    withBackButton: true,
  },
} satisfies Story;

const getTimerEndDate = () => {
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 1);
  return endDate;
};

export const WithContextArea = {
  args: {
    ...Default.args,
    contextArea: () => [
      h(OnyxTag, { label: "QA stage", color: "warning", icon: browserTerminal }),
      h(OnyxNavSeparator),
      h(OnyxUserMenu, OnyxUserMenuDefault.args, {
        footer: OnyxUserMenuDefault.args.footer,
      }),
    ],
  },
} satisfies Story;

/**
 * This example shows a nav bar with a timer inside the context area that can e.g.
 * be used to indicate to the user that he will be automatically logged out after a given time.
 */
export const WithLogoutTimer = {
  args: {
    ...Default.args,
    contextArea: () => [
      h(OnyxTimer, { endTime: getTimerEndDate(), label: "Logout in:" }),
      h(OnyxNavSeparator),
      h(OnyxUserMenu, OnyxUserMenuDefault.args),
    ],
  },
} satisfies Story;

/**
 * This example shows a navigation bar with custom app area content.
 */
export const WithCustomAppArea = {
  args: {
    ...Default.args,
    appArea: () => [h(OnyxIcon, { icon: placeholder, color: "secondary" }), "Custom name"],
  },
} satisfies Story;
