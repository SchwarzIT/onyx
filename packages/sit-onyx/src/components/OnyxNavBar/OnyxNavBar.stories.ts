import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
import search from "@sit-onyx/icons/search.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxMenuItem from "./modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavButton from "./modules/OnyxNavButton/OnyxNavButton.vue";
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxNavSeparator from "./modules/OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxTimer from "./modules/OnyxTimer/OnyxTimer.vue";
import { Default as OnyxUserMenuDefault } from "./modules/OnyxUserMenu/OnyxUserMenu.stories";
import OnyxUserMenu from "./modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

const meta: Meta<typeof OnyxNavBar> = {
  title: "Navigation/NavBar",
  component: OnyxNavBar,
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
};

export default meta;
type Story = StoryObj<typeof OnyxNavBar>;

export const Default = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavButton, { label: "Item 1", link: "/" }),
      h(
        OnyxNavButton,
        { label: "Item 2" },
        {
          default: () => ["Item 2", h(OnyxBadge, { dot: true, color: "warning" })],
          children: () => [
            h(
              OnyxNavButton,
              { label: "Nested item 2.1" },
              {
                children: () => [
                  h(
                    OnyxNavButton,
                    { label: "Nested item 2.1.1" },
                    {
                      children: () => [
                        h(OnyxNavButton, { label: "Nested item 2.1.1.1", link: "#" }),
                        h(OnyxNavButton, { label: "Nested item 2.1.1.2", link: "#", active: true }),
                        h(OnyxNavButton, {
                          label: "Nested item 2.1.1.3",
                          link: "https://onyx.schwarz",
                        }),
                      ],
                    },
                  ),
                  h(OnyxNavButton, { label: "Nested item 2.1.2", link: "#", active: true }),
                  h(OnyxNavButton, { label: "Nested item 2.1.3", link: "https://onyx.schwarz" }),
                ],
              },
            ),
            h(OnyxNavButton, { label: "Nested item 2.2", link: "#", active: true }),
            h(OnyxNavButton, { label: "Nested item 2.3", link: "https://onyx.schwarz" }),
          ],
        },
      ),
      h(
        OnyxNavButton,
        { label: "Item 3" },
        {
          children: () => [
            h(OnyxNavButton, { label: "Nested item 3.1", link: "#" }),
            h(OnyxNavButton, { label: "Nested item 3.2", link: "#" }),
          ],
        },
      ),
      h(OnyxNavButton, { label: "Item 4", link: "https://onyx.schwarz" }),
    ],
    mobileActivePage: "Nested item 2.2",
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
 * This nav bar has a lot of menu and context area items.
 * Both the nav area as well as the context area will overflow when opened.
 */
export const WithOverflowingMobileContent = {
  args: {
    ...WithContextArea.args,
    mobileBreakpoint: "xl",
    default: () => [
      h(OnyxNavButton, { label: "Item 1", link: "/" }),
      h(
        OnyxNavButton,
        { label: "Item 2", link: "/test" },
        {
          default: () => ["Item 2", h(OnyxBadge, { dot: true, color: "warning" })],
          children: () =>
            Array.from({ length: 20 }, (_, index) =>
              h(OnyxNavItem, { label: `Nested item 2.${index + 1}`, link: "#" }),
            ),
        },
      ),
      Array.from({ length: 20 }, (_, index) =>
        h(OnyxNavButton, { label: `Item ${index + 3}`, link: "/" }),
      ),
    ],
    contextArea: () => [
      h(OnyxTag, { label: "QA stage", color: "warning", icon: browserTerminal }),
      h(OnyxNavSeparator),
      h(OnyxUserMenu, OnyxUserMenuDefault.args, {
        default: Array.from({ length: 20 }, (_, index) =>
          h(OnyxMenuItem, () => [h(OnyxIcon, { icon: settings }), `Context option ${index}`]),
        ),
        footer: OnyxUserMenuDefault.args.footer,
      }),
    ],
  },
} satisfies Story;
