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
 * ## Structure
 *
 * ### Desktop
 * The NavBar is a modular component that can be used very individually, based on the requirements of the application. The left area always shows the app icon and its application name and also serves as the home button. To the right, the top bar offers optional space for a back button. This button works in the same way as its browser equivalent. The largest part of the top bar is used as the navigation area. All navigation items of the application are accessible here. The right-hand area of the top bar supports global and application-specific functions, such as user options or language selection. Due to the modular structure of the component, all building blocks can be used individually. This ensures that each application has its own customised global main navigation and function. There are six available slots on the right side context area, that can be filled with modules (module description below).
 *
 * ### Mobile
 * In the mobile breakpoint, the NavBar works much more space-efficiently. The app icon gives way to a burger menu button that opens the burger menu from top to bottom. This contains all the main navigation points of the application (compare with Navigation Area Desktop Breakpoint). In addition, the mobile NavBar always shows the currently selected tab when closed. On the right side, a "More Icon" is displayed, which the user can use to open the context menu. All options and functions that are used individually for the application can be found here (compare with context area desktop breakpoint). There is also a clearly arranged User Area here. All features used in the mobile version are derived from the modules used in the desktop version.
 *
 * ## Behavior
 * The component automatically adapts responsively to the screen size. The breakpoints are defined by the **onyx** by default. The flexible width of the navigation area may be too small for all navigation items on small screens. All "hidden" items are then automatically merged under the tab "x more items". The items can be accessed here via a flyout. In the event that the "hidden" items themselves have a flyout, this is displayed by a drilldown.
 * As soon as the mobile breakpoint is reached, the context area automatically changes into a "more icon". In addition, the burger menu appears automatically (description in the structure paragraph). The open burger menu and Contect menu can both be closed via a x-icon that appears.
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
      h(OnyxNavItem, { label: "Button", onClick: action("button clicked") }),
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
      h(OnyxNavItem, { label: "External Link", link: "https://onyx.schwarz" }),
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
