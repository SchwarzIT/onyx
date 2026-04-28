import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxSearch from "./OnyxSearch.vue";

/**
 * This type of searchbar is ideal for simpler, less complex, and smaller datasets. It provides a straightforward text search functionality, allowing users to type in a keyword or phrase and receive results that directly match their input. This option is best suited for cases where data retrieval is straightforward and filtering isn’t necessary.
 */
const meta: Meta<typeof OnyxSearch> = {
  title: "Search & Filter/Search",
  component: OnyxSearch,
  tags: ["!autodocs", "unstable"],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 24rem;"> <story /> </div>`,
    }),
  ],
  argTypes: {
    disabled: { control: { type: "boolean" } },
    // ...withNativeEventLogging(["onInput", "onSubmit", "onFocusin", "onFocusout"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSearch>;

/**
 * This example shows a default input.
 */
export const Default = {
  args: {
    label: "Search...",
  },
} satisfies Story;

/**
 * This example shows a disabled input that can not be edited and is therefore not included in any form data.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

/**
 * To provide perfect contrasts in whatever use-case, the component is available in two color modes: blank and tinted. It is intended to use the color that is opposite to the tinted or blank color of the underlying canvas.
 */
export const StrongCornerRadius = {
  args: {
    ...Default.args,
    cornerRadius: "strong",
  },
} satisfies Story;

/**
 * To provide perfect experiences in whatever use-case, the component is available in two corner radius modes: soft and strong.
 */
export const Tinted = {
  args: {
    ...Default.args,
    color: "tinted",
  },
} satisfies Story;

export const ShortCut = {
  args: {
    ...Default.args,
    shortcut: {
      sequence: [
        {
          all: ["Control", "S"],
        },
      ],
    },
  },
};

/**
 * This example shows a skeleton input.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

export const FilterUnderneath = {
  ...createAdvancedStoryExample("OnyxSearch", "FilterUnderneath"),
} satisfies Story;

export const FilterBeside = {
  ...createAdvancedStoryExample("OnyxSearch", "FilterBeside"),
} satisfies Story;

export const FilterModal = {
  ...createAdvancedStoryExample("OnyxSearch", "FilterModal"),
} satisfies Story;
