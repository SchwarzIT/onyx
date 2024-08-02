import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxAppLayout from "./OnyxAppLayout.vue";

/**
 * Layout component that structures your application.
 * Includes slots for a nav bar, page content, and overlays above the page or the whole app.
 * Recommended to use on App.vue level of an application.
 */
const meta: Meta<typeof OnyxAppLayout> = {
  title: "Layout/AppLayout",
  ...defineStorybookActionsAndVModels({
    component: OnyxAppLayout,
    events: [],
    argTypes: {
      navBar: {
        control: { disable: true },
      },
      default: {
        control: { disable: true },
      },
      pageOverlay: {
        control: { disable: true },
      },
      appOverlay: {
        control: { disable: true },
      },
    },
  }),
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxAppLayout>;

/** Standard app layout with a nav bar and some content. */
export const Default = {
  args: {
    default: () => h("div", "This is the page content."),
    navBar: () =>
      h(
        "header",
        {
          style: "border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);",
        },
        "Nav bar",
      ),
  },
} satisfies Story;

/** App layout where the nav bar is left aligned. */
export const LeftNav = {
  args: {
    navBarAlignment: "left",
    default: () => h("div", "This is the page content."),
    navBar: () =>
      h(
        "header",
        {
          style:
            "border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300); height: 100%;",
        },
        "Nav bar",
      ),
  },
} satisfies Story;

/** Example of an overlay that covers the whole application. */
export const AppOverlay = {
  args: {
    ...Default.args,
    appOverlay: () =>
      h(
        "div",
        {
          style: `background-color: var(--onyx-color-base-background-tinted);
                  position: absolute;
                  inset: 10rem;
                  min-width: 5rem;
                  min-height: 1rem;
      `,
        },
        "This is an overlay that covers the whole app.",
      ),
  },
} satisfies Story;

/** Example of an overlay that covers the whole page section of an application. */
export const PageOverlay = {
  args: {
    ...Default.args,
    pageOverlay: () =>
      h(
        "div",
        {
          style: `backdrop-filter: blur(4px);
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 100%;
              align-items: center;`,
        },
        [
          h("div", "This is an overlay that covers the page content."),
          h("div", "The nav bar is excluded."),
        ],
      ),
  },
} satisfies Story;
