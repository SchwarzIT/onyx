import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import search from "@sit-onyx/icons/search.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { ONYX_BREAKPOINTS } from "../../types";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxNavButton from "./modules/OnyxNavButton/OnyxNavButton.vue";
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxNavSeparator from "./modules/OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxTimer from "./modules/OnyxTimer/OnyxTimer.vue";
import { Default as OnyxUserMenuDefault } from "./modules/OnyxUserMenu/OnyxUserMenu.stories";
import OnyxUserMenu from "./modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

const meta: Meta<typeof OnyxNavBar> = {
  title: "Navigation/NavBar",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavBar,
    events: ["appAreaClick", "backButtonClick"],
    argTypes: {
      default: { control: { disable: true } },
      contextArea: { control: { disable: true } },
      appArea: { control: { type: "text" } },
      mobileActivePage: { control: { type: "text" } },
      globalContextArea: { control: { disable: true } },
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
    parameters: {
      layout: "fullscreen",
    },
    decorators: [
      // add padding to the story so the nav button and user menu flyouts are shown
      (story) => ({
        components: { story },
        template: `<div style="padding-bottom: 20rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavBar>;

export const Default = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavButton, { label: "Item 1", href: "/" }),
      h(
        OnyxNavButton,
        { label: "Item 2", href: "/test" },
        {
          default: () => ["Item 2", h(OnyxBadge, { dot: true, color: "warning" })],
          children: () => [
            h(OnyxNavItem, { label: "Nested item 2.1", href: "#" }),
            h(OnyxNavItem, { label: "Nested item 2.2", href: "#", active: true }),
            h(OnyxNavItem, { label: "Nested item 2.3", href: "https://onyx.schwarz" }),
          ],
        },
      ),
      h(OnyxNavButton, { label: "Item 3", href: "https://onyx.schwarz" }),
    ],
    mobileActivePage: "Nested item 2",
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
    globalContextArea: () => [
      h(OnyxIconButton, { label: "Search", icon: search, color: "neutral" }),
    ],
    contextArea: () => [
      h(OnyxTag, { label: "QA stage", color: "warning", icon: browserTerminal }),
      h(OnyxNavSeparator),
      h(OnyxUserMenu, OnyxUserMenuDefault.args, {
        default: OnyxUserMenuDefault.args.default,
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
      h(OnyxUserMenu, OnyxUserMenuDefault.args, {
        default: OnyxUserMenuDefault.args.default,
        footer: OnyxUserMenuDefault.args.footer,
      }),
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
