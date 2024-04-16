import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watchEffect } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxListbox from "./OnyxListbox.vue";
import type { ListboxOption } from "./types";

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
  title: "support/Listbox",
  ...defineStorybookActionsAndVModels({
    component: OnyxListbox,
    events: ["update:modelValue", "lazyLoad"],
    argTypes: {
      empty: { control: { disable: true } },
      optionsEnd: { control: { disable: true } },
      modelValue: { control: { type: "text" } },
    },
    /**
     * Decorator that simulates the load more functionality so we can show it in the stories.
     */
    decorators: [
      (story, ctx) => ({
        components: { story },
        setup: () => {
          const { isLazyLoading, handleLoadMore, options } = useLazyLoading(ctx.args.options);

          watchEffect(() => {
            ctx.args.lazyLoading = { ...ctx.args.lazyLoading, loading: isLazyLoading.value };
            ctx.args.options = options.value;
          });

          return { handleLoadMore, isLazyLoading, options };
        },
        template: `<story @lazy-load="handleLoadMore" />`,
      }),
    ],
  }),
};

const groupedAnimals = [
  {
    id: "cat",
    label: "Cat",
    group: "Land",
  },
  {
    id: "dog",
    label: "Dog",
    group: "Land",
  },
  {
    id: "tiger",
    label: "Tager",
    group: "Land",
  },
  {
    id: "reindeer",
    label: "Reindeer",
    group: "Land",
  },
  {
    id: "racoon",
    label: "Racoon",
    group: "Land",
  },
  {
    id: "dolphin",
    label: "Dolphin",
    group: "Water",
  },
  {
    id: "flounder",
    label: "Flounder",
    group: "Water",
  },
  {
    id: "eel",
    label: "Eel",
    group: "Water",
  },
  {
    id: "falcon",
    label: "Falcon",
    group: "Air",
  },
  {
    id: "owl",
    label: "Owl",
    group: "Air",
  },
];

export default meta;
type Story = StoryObj<typeof OnyxListbox>;

/**
 * This example shows a default single select listbox.
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
    ].map((option) => ({
      id: option.toLowerCase(),
      label: option,
    })),
  },
} satisfies Story;

/**
 * This example shows a listbox with a message / help text at the bottom.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: "Example message",
  },
} satisfies Story;

/**
 * This example shows a listbox with grouped options.
 */
export const GroupedOptions = {
  args: {
    label: "Grouped listbox",
    options: groupedAnimals,
  },
} satisfies Story;

/**
 * This example shows an empty listbox with default translated message.
 * You can use the `empty` slot to customize the content.
 */
export const Empty = {
  args: {
    ...Default.args,
    options: [],
  },
} satisfies Story;

/**
 * This example shows a loading listbox.
 */
export const Loading = {
  args: {
    ...Empty.args,
    loading: true,
  },
} satisfies Story;

/**
 * This example shows a loading listbox with lazy loading. The `lazyLoad` event will be emitted if the user scrolls
 * to the end of the options.
 */
export const LazyLoading = {
  args: {
    ...Default.args,
    lazyLoading: {
      enabled: true,
    },
  },
} satisfies Story;

/**
 * This example shows a loading listbox with button loading.
 */
export const ButtonLoading = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => {
      return { args, ...useLazyLoading(args.options) };
    },
    components: { OnyxListbox, OnyxButton },
    template: `
      <OnyxListbox v-bind="args" :options="options">
        <template #optionsEnd>
          <OnyxButton label="Load more items" mode="plain" :loading="isLazyLoading" style="width: 100%" icon='${plusSmall}' @click="handleLoadMore" />
        </template>
      </OnyxListbox>
`,
  }),
} satisfies Story;

const useLazyLoading = (initialOptions: ListboxOption[]) => {
  const isLazyLoading = ref(false);
  const options = ref(initialOptions);

  const handleLoadMore = async () => {
    isLazyLoading.value = true;
    await new Promise<void>((resolve) => setTimeout(resolve, 750));

    options.value = options.value.concat(
      Array.from({ length: 25 }, (_, index) => {
        const id = options.value.length - initialOptions.length + index + 1;
        return { id, label: `Loaded option ${id}` };
      }),
    );

    isLazyLoading.value = false;
  };

  return { isLazyLoading, handleLoadMore, options };
};
