import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxComponent from "./OnyxComponent.vue";
import OnyxOtherComponent from "./OnyxOtherComponent.vue";

// #region meta
/**
 * TODO: Add a general description for this component
 */
const meta: Meta<typeof OnyxComponent> = {
  title: "Category/Subcategory/Component",
  component: OnyxComponent,
  argTypes: {
    propName: { control: { type: "text" } }, // TODO: remove or add custom overwrites for properties
    ...withNativeEventLogging(["onInput", "onChange", "onFocusin", "onFocusout"]),
  },
};
export default meta;
// #endregion meta

// #region story
type Story = StoryObj<typeof OnyxComponent>;

/**
 * TODO: Add a description for this Story
 */
export const Default = {
  args: {
    propName: "Value",
  },
} satisfies Story;

/**
 * TODO: Add a description for this Story
 */
export const Other = {
  args: {
    ...Default.args,
    otherPropName: true,
  },
} satisfies Story;
// #endregion story

// #region slot
export const WithSlotContent = {
  args: {
    ...Default.args,
    slotName: () => [
      // The `h` function takes the following form:
      // h(componentOrHtmlTag, propertiesAndAttributes, innerTextOrSlotContent)
      h(OnyxOtherComponent, { label: "Item 1", href: "/" }),
      h("a", { target: "_blank", href: "https://onyx.schwarz" }, "onyx"),
    ],
  },
} satisfies Story;
// #endregion slot
