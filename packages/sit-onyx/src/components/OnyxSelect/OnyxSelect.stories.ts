import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { computed, ref, watchEffect } from "vue";
import { normalizedIncludes } from "../../utils/strings";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxSelect from "./OnyxSelect.vue";
import type { SelectOption } from "./types";

/**
 * The select is a fundamental element utilized across various components such as
 * dropdowns, navigation bars, paginations, tables, etc.
 * It provides the users with the ability to open a small modal window,
 * facilitating single or multi-selection based on the context in which it is employed.
 *
 * ### Keyboard shortcuts
 * The following keyboard shortcuts are available:
 * - **Tab**: Focuses / blurs the select
 * - **Arrow down**: Focuses the next option
 * - **Arrow up**: Focuses the previous option
 * - **Home**: Focuses the first option
 * - **End**: Focuses the last option
 * - **Space**: Selects currently focused option
 * - **Other characters**: Focuses first option that starts with the pressed key
 */
const meta: Meta<typeof OnyxSelect> = {
  title: "components/Select",
  ...defineStorybookActionsAndVModels({
    component: OnyxSelect,
    events: ["update:modelValue", "update:searchTerm", "lazyLoad"],
    argTypes: {
      empty: { control: { disable: true } },
      optionsEnd: { control: { disable: true } },
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
        template: `<story style="max-width: 24rem; margin-bottom: 20rem;" @lazy-load="handleLoadMore" />`,
      }),
    ],
    /**
     * Renderer to simulate search
     */
    render: (args) => ({
      components: { OnyxSelect },
      setup: () => {
        const searchTerm = computed(() => (args.withSearch && args.searchTerm) || "");

        const filteredOptions = computed(() =>
          searchTerm.value
            ? args.options.filter(({ label }) => normalizedIncludes(label, searchTerm.value))
            : args.options,
        );

        return { args, filteredOptions };
      },
      template: `<OnyxSelect v-bind="args" :options="filteredOptions" />`,
    }),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSelect>;

const DEMO_OPTIONS = [
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
].map<SelectOption>((option) => ({ value: option.toLowerCase(), label: option }));
DEMO_OPTIONS.splice(6, 0, {
  value: "disabled",
  label: "Unavailable fruit",
  disabled: true,
});

/**
 * This example shows a default single select.
 */
export const Default = {
  args: {
    label: "Example select",
    listLabel: "List label",
    options: DEMO_OPTIONS,
    placeholder: "Placeholder...",
  },
} satisfies Story;

/**
 * This example shows a select with a message / help text at the bottom.
 */
export const WithMessage = {
  args: {
    ...Default.args,
    message: "Example message",
  },
} satisfies Story;

/**
 * Multiselect. You can disable the `Select all` option by removing the `withCheckAll` property.
 */
export const Multiselect = {
  args: {
    ...Default.args,
    modelValue: [DEMO_OPTIONS[0], DEMO_OPTIONS[1]],
    multiple: true,
    withCheckAll: true,
    options: [
      {
        value: "disabled-2",
        label: "Selected unavailable fruit",
        disabled: true,
      },
      ...Default.args.options,
      { value: "long", label: "Option with a very long long long  long long long long text" },
    ],
  },
} satisfies Story;

/**
 * Multiselect with "preview" textMode so the selected values are displayed.
 */
export const MultiselectWithPreview = {
  args: {
    ...Multiselect.args,
    textMode: "preview",
  },
} satisfies Story;

/**
 * This example shows a select with grouped options.
 */
export const GroupedOptions = {
  args: {
    label: "Grouped select",
    listLabel: "List label",
    options: [
      { value: "cat", label: "Cat", group: "Land" },
      { value: "dog", label: "Dog", group: "Land" },
      { value: "tiger", label: "Tiger", group: "Land" },
      { value: "reindeer", label: "Reindeer", group: "Land" },
      { value: "racoon", label: "Racoon", group: "Land" },
      { value: "dolphin", label: "Dolphin", group: "Water" },
      { value: "flounder", label: "Flounder", group: "Water" },
      { value: "eel", label: "Eel", group: "Water" },
      { value: "falcon", label: "Falcon", group: "Air" },
      { value: "owl", label: "Owl", group: "Air" },
    ],
  },
} satisfies Story;

/**
 * This example shows a empty select with default translated message.
 * You can use the `empty` slot to customize the content.
 */
export const Empty = {
  args: {
    ...Default.args,
    options: [],
  },
} satisfies Story;

/**
 * This example shows a select with search functionality.
 */
export const WithSearch = {
  args: {
    ...Default.args,
    withSearch: true,
  },
} satisfies Story;

/**
 * This example shows a loading select.
 */
export const Loading = {
  args: {
    ...Empty.args,
    loading: true,
  },
} satisfies Story;

/**
 * This example shows a select with lazy loading. The `lazyLoad` event will be emitted if the user scrolls
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
 * This example shows a select with custom button for loading.
 */
export const ButtonLoading = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    setup: () => {
      return { args, ...useLazyLoading(args.options) };
    },
    components: { OnyxSelect, OnyxButton },
    template: `
      <OnyxSelect v-bind="args" :options="options">
        <template #optionsEnd>
          <OnyxButton label="Load more" mode="plain" :loading="isLazyLoading" style="width: 100%" icon='${plusSmall}' @click="handleLoadMore" />
        </template>
      </OnyxSelect>
`,
  }),
} satisfies Story;

/**
 * This example shows a readonly select that can not be edited.
 */
export const Readonly = {
  args: {
    ...Default.args,
    readonly: true,
  },
} satisfies Story;

/**
 * This example shows a disabled select that can not be edited and is therefore not included in any form data.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    label: "Example select",
    listLabel: "List label",
    skeleton: true,
    options: [],
  },
} satisfies Story;

const useLazyLoading = (initialOptions: SelectOption[]) => {
  const isLazyLoading = ref(false);
  const options = ref(initialOptions);

  const handleLoadMore = async () => {
    isLazyLoading.value = true;
    await new Promise<void>((resolve) => setTimeout(resolve, 750));

    options.value = options.value.concat(
      Array.from({ length: 25 }, (_, index) => {
        const value = options.value.length - initialOptions.length + index + 1;
        return { value, label: `Loaded option ${value}` };
      }),
    );

    isLazyLoading.value = false;
  };

  return { isLazyLoading, handleLoadMore, options };
};
