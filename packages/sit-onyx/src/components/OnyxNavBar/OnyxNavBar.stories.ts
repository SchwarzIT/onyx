import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
import search from "@sit-onyx/icons/search.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxMenuItem from "./modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxNavSeparator from "./modules/OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxTimer from "./modules/OnyxTimer/OnyxTimer.vue";
import { Default as OnyxUserMenuDefault } from "./modules/OnyxUserMenu/OnyxUserMenu.stories";
import OnyxUserMenu from "./modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

/**
 * The NavBar is the foundation of an app’s main navigation, allowing users to seamlessly move between pages and sections within the application.
 */
const meta: Meta<typeof OnyxNavBar> = {
  title: "Navigation/NavBar",
  component: OnyxNavBar,
  argTypes: {
    default: { control: { disable: true } },
    contextArea: { control: { disable: true } },
    appArea: { control: { type: "text" } },
    mobileActivePage: { control: { type: "text" } },
    globalContextArea: { control: { disable: true } },
    mobile: {
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
    (story) => {
      return {
        methods: {
          handleAnchorClick: (e: MouseEvent & { target: Element }) => {
            const a = e.target.closest("a") as HTMLAnchorElement | null;
            if (a) {
              // prevent navigate to the link when clicked as it would navigate away from the storybook iframe
              e.preventDefault();
              action("link clicked")(a.href);
            }
          },
        },
        components: { story },
        template: `<div style="padding-bottom: 20rem;"> <story @click="handleAnchorClick" /> </div>`,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxNavBar>;

export const Default = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavItem, { label: "Router Link", link: "#router-link" }),
      h(
        OnyxNavItem,
        { label: "Nesting" },
        {
          children: () => [
            h(OnyxNavItem, { label: "Nested Router Link", link: "#nested-router-link" }),
            h(OnyxNavItem, { label: "Nested Button", onClick: action("button clicked") }),
          ],
        },
      ),
    ],
    mobileActivePage: "Nested item 2.2",
  },
} satisfies Story;

export const Nested = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavItem, { label: "Item 1", link: "https://it.schwarz/" }),
      h(
        OnyxNavItem,
        { label: "Item 2" },
        {
          default: () => ["Item 2", h(OnyxBadge, { dot: true, color: "warning" })],
          children: () => [
            h(
              OnyxNavItem,
              { label: "Nested item 2.1" },
              {
                children: () => [
                  h(OnyxNavItem, { label: "Nested item 2.1.2", link: "#2.1.2" }),
                  h(OnyxNavItem, { label: "Nested item 2.1.3", link: "#2.1.3" }),
                ],
              },
            ),
            h(OnyxNavItem, { label: "Nested item 2.2", link: "#2.2" }),
            h(OnyxNavItem, { label: "Nested item 2.3", link: "#2.3" }),
          ],
        },
      ),
      h(
        OnyxNavItem,
        { label: "Item 3" },
        {
          children: () => [
            h(OnyxNavItem, { label: "Nested item 3.1", link: "#3.1" }),
            h(OnyxNavItem, { label: "Nested item 3.2", link: "#3.2" }),
          ],
        },
      ),
      h(OnyxNavItem, { label: "Item 4", link: "https://onyx.schwarz" }),
    ],
    mobileActivePage: "Nested item 2.2",
  },
} satisfies Story;

export const WithMoreListItem = {
  tags: ["new:feature"],
  parameters: {
    viewport: { defaultViewport: "sm" },
  },
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
    default: () => [
      h(OnyxNavItem, { label: "Menuitem 0" }),
      h(OnyxNavItem, { label: "Menuitem 1" }),
      h(OnyxNavItem, { label: "Menuitem 2" }),
      h(OnyxNavItem, { label: "Menuitem 3" }),
      h(OnyxNavItem, { label: "Menuitem 4" }),
      h(
        OnyxNavItem,
        { label: "Item 2" },
        {
          default: () => ["Item 2", h(OnyxBadge, { dot: true, color: "warning" })],
          children: () => [
            h(
              OnyxNavItem,
              { label: "Nested item 2.1" },
              {
                children: () => [
                  h(OnyxNavItem, { label: "Nested item 2.1.2", link: "#2.1.2" }),
                  h(OnyxNavItem, { label: "Nested item 2.1.3", link: "#2.1.3" }),
                ],
              },
            ),
            h(OnyxNavItem, { label: "Nested item 2.2", link: "#2.2" }),
            h(OnyxNavItem, { label: "Nested item 2.3", link: "#2.3" }),
          ],
        },
      ),
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
 * be used to indicate to the user that they will be automatically logged out after a given time.
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
export const Mobile = {
  args: {
    ...WithContextArea.args,
    mobile: true,
    default: () => [
      h(OnyxNavItem, { label: "Item 1", link: "/" }),
      h(
        OnyxNavItem,
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
        h(OnyxNavItem, { label: `Item ${index + 3}`, link: "/" }),
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
