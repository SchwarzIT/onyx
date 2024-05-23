import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxPageLayout from "./OnyxPageLayout.vue";

/**
 * Layout component that structures your page.
 * Includes slots for a sidebar, page content, footer and notifications.
 * Recommended to use on view/page level of an application.
 */
const meta: Meta<typeof OnyxPageLayout> = {
  title: "layout/PageLayout",
  ...defineStorybookActionsAndVModels({
    component: OnyxPageLayout,
    events: [],
    argTypes: {
      default: {
        control: { disable: true },
      },
      sidebar: {
        control: { disable: true },
      },
      footer: {
        control: { disable: true },
      },
      toasts: {
        control: { disable: true },
      },
    },
  }),
  // storybook adds 1rem padding. The app layout fills the full available space
  // so we need to counteract the padding with a negative margin.
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="margin: -1rem; height: 20rem;
                    font-family: var(--onyx-font-family);
                    color: var(--onyx-color-text-icons-neutral-intense);" >
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxPageLayout>;

/** A standard page with some content. */
export const Default = {
  args: {
    default: () => h("div", "This is the page content."),
  },
} satisfies Story;

/** A standard page with a fixed sidebar. */
export const WithSidebar = {
  args: {
    ...Default.args,
    sidebar: () =>
      h(
        "div",
        {
          style:
            "height: 100%; border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);",
        },
        "Side Bar Content",
      ),
  },
} satisfies Story;

/** A standard page with a footer. */
export const WithFooter = {
  args: {
    ...Default.args,
    footer: () =>
      h(
        "div",
        { style: "border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);" },
        "Footer Content",
      ),
  },
} satisfies Story;

/** A page that shows a sidebar and a footer next to it. */
export const WithPartialFooter = {
  args: {
    ...WithSidebar.args,
    footer: WithFooter.args.footer,
    footerAsideSidebar: true,
  },
} satisfies Story;

/** A page that shows a toast. */
export const WithToast = {
  args: {
    ...WithPartialFooter.args,
    toasts: () =>
      h(
        "div",
        {
          style: `display: flex;
                  justify-content: center;
                  width: 90%;
                  background-color: var(--onyx-color-base-neutral-900);
                  opacity: 0.9;
                  color: var(--onyx-color-text-icons-neutral-inverted);
                  margin: auto;`,
        },
        "This is the place for a toast",
      ),
  },
} satisfies Story;
