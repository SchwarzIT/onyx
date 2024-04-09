import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Decorator, Meta, StoryObj } from "@storybook/vue3";
import OnyxListbox from "./OnyxListbox.vue";
import { LOADING_MODES, type OnyxListboxProps } from "./types";

/**
 * The listbox is a fundamental element utilized across various components such as
 * dropdowns, navigation bars, paginations, tables, etc.
 * It provides the users with the ability to open a small modal window,
 * facilitating single or multi-selection based on the context in which it is employed.
 *
 * ### Keyboard shortcuts
 * The following keyboard shortcuts are available:
 * - **Tab**: Focuses / blurs the listbox
 * - **Arrow down**: Focuses the next option
 * - **Arrow up**: Focuses the previous option
 * - **Home**: Focuses the first option
 * - **End**: Focuses the last option
 * - **Space**: Selects currently focused option
 * - **Other characters**: Focuses first option that starts with the pressed key
 */
const meta: Meta<typeof OnyxListbox> = {
  title: "support/OnyxListbox",
  ...defineStorybookActionsAndVModels({
    component: OnyxListbox,
    events: ["update:modelValue", "loadMore"],
    argTypes: {
      loadingMode: {
        options: LOADING_MODES,
        control: { type: "radio" },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxListbox>;

/**
 * Decorator that simulates the load more functionality so we can show it in the stories.
 */
const loadingDecorator: Decorator<OnyxListboxProps> = (story, ctx) => ({
  components: { story },
  setup: () => {
    const originalOptionsCount = ctx.args.options.length;

    const handleLoad = async () => {
      ctx.args.loading = true;
      await new Promise<void>((resolve) => setTimeout(resolve, 750));

      ctx.args.options = ctx.args.options.concat(
        Array.from({ length: 25 }, (_, index) => {
          const id = ctx.args.options.length - originalOptionsCount + index + 1;
          return { id, label: `Loaded option ${id}` };
        }),
      );

      ctx.args.loading = false;
    };

    return { handleLoad };
  },
  template: `<story @load-more="handleLoad" />`,
});

/**
 * This examples shows a default single select listbox.
 */
export const Default = {
  args: {
    label: "Example listbox",
    options: [
      "Apple",
      "Banana",
      "Mango",
      "Kiwi",
      "Orange",
      "Papaya",
      "Apricot",
      "Lemon",
      "Cranberry",
      "Avocado",
      "Cherry",
      "Coconut",
      "Lychee",
      "Melon",
      "Raspberry",
      "Strawberry",
    ].map((option) => ({ id: option.toLowerCase(), label: option })),
  },
} satisfies Story;

/**
 * This examples shows a listbox with a message / help text at the bottom.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: "Example message",
  },
} satisfies Story;

/**
 * This examples shows an empty listbox with default translated message.
 * You can use the `empty` slot to customize the content.
 */
export const Empty = {
  args: {
    ...Default.args,
    options: [],
  },
} satisfies Story;

/**
 * This examples shows a loading listbox.
 */
export const Loading = {
  args: {
    ...Empty.args,
    loading: true,
  },
} satisfies Story;

/**
 * This examples shows a loading listbox with lazy loading. The `loadMore` event will be emitted if the user scrolls
 * to the end of the options.
 *
 * **Note**: The actual data loading is not implemented in this example. You should listen to the `loadMore` event
 * to load more options.
 */
export const LazyLoading = {
  args: {
    ...Default.args,
    loadingMode: "lazy",
  },
  decorators: [loadingDecorator],
} satisfies Story;

/**
 * This examples shows a loading listbox with button loading. The `loadMore` event will be emitted if the user clicks
 * the load more button when scrolled to the end of the options.
 *
 * **Note**: The actual data loading is not implemented in this example. You should listen to the `loadMore` event
 * to load more options.
 */
export const ButtonLoading = {
  args: {
    ...Default.args,
    loadingMode: "button",
  },
  decorators: [loadingDecorator],
} satisfies Story;
