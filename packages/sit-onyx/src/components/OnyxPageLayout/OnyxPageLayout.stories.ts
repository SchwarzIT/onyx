import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxRadioGroup from "../OnyxRadioGroup/OnyxRadioGroup.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxPageLayout from "./OnyxPageLayout.vue";

/**
 * Layout component that structures your page.
 * Includes slots for a sidebar, page content, footer and notifications.
 * Recommended to use on view/page level of an application.
 */
const meta: Meta<typeof OnyxPageLayout> = {
  title: "Layout/PageLayout",
  component: OnyxPageLayout,
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
  },
  // storybook adds 1rem padding. The app layout fills the full available space
  // so we need to counteract the padding with a negative margin.
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="height: 15rem;
                    font-family: var(--onyx-font-family);
                    color: var(--onyx-color-text-icons-neutral-intense);" >
          <story />
        </div>`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxPageLayout>;

const EXAMPLE_OPTIONS = [
  { label: "Green", value: 1 },
  { label: "Red", value: 2 },
  { label: "Pink", value: 3 },
  { label: "Yellow", value: 4 },
];

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

/** A standard page with sidebar and footer. */
export const WithSidebarAndFooter = {
  args: {
    ...WithSidebar.args,
    footer: WithFooter.args.footer,
  },
} satisfies Story;

/** A page that shows a sidebar and a footer next to it. */
export const WithPartialFooter = {
  args: {
    ...WithSidebarAndFooter.args,
    footerAsideSidebar: true,
  },
} satisfies Story;

/** A standard page in skeleton mode. */
export const WithSkeletonComponents = {
  args: {
    skeleton: true,
    default: () => [
      h("form", {}, [
        h(OnyxInput, { label: "Favorite band", modelValue: "Que2en", pattern: "[A-Za-z ]+" }),
        h(OnyxInput, { label: "Favorite password", type: "password", modelValue: "incorrect" }),
        h(OnyxStepper, { label: "Number of hairs", min: 0, modelValue: 23 }),
        h(OnyxRadioGroup, {
          label: "Color choices",
          options: EXAMPLE_OPTIONS,
          modelValue: EXAMPLE_OPTIONS[0].value,
        }),
        h(
          "div",
          {
            style: { display: "flex", gap: "0.5rem" },
          },
          [
            h(OnyxButton, { label: "Reset", type: "reset", mode: "outline" }),
            h(OnyxButton, { label: "Submit", type: "submit", formmethod: "dialog" }), // we use formmethod `dialog` to avoid a page load on submit
          ],
        ),
      ]),
    ],
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="height: 30rem; width: 16rem; padding: 0.3rem"> <story /> </div>`,
    }),
  ],
} satisfies Story;
