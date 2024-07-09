import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { computed, h, ref, watchEffect } from "vue";
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
 * - **Enter/Space**: Selects currently focused option. Select with space is only working when `withSearch` is disabled.
 * - **Other characters**: Focuses first option that starts with the pressed key
 */
const meta: Meta<typeof OnyxSelect> = {
  title: "Form/Select",
  ...defineStorybookActionsAndVModels({
    component: OnyxSelect,
    // TODO: find out why validityChange does not fire.
    events: ["update:modelValue", "update:searchTerm", "update:open", "lazyLoad", "validityChange"],
    argTypes: {
      empty: { control: { disable: true } },
      optionsEnd: { control: { disable: true } },
      option: { control: { disable: true } },
    },

    decorators: [
      /**
       * Decorator that simulates the load more functionality so we can show it in the stories.
       */
      (story, ctx) => {
        return {
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
        };
      },
      /**
       * Decorator to simulate search
       */
      (story, ctx) => ({
        components: { story },
        setup: () => {
          const searchTerm = computed(() => (ctx.args.withSearch && ctx.args.searchTerm) || "");

          const filteredOptions = computed(() =>
            searchTerm.value
              ? ctx.args.options.filter(({ label }) => normalizedIncludes(label, searchTerm.value))
              : ctx.args.options,
          );

          watchEffect(() => {
            ctx.args.options = filteredOptions.value;
            ctx.args.options; // this is needed to keep the reactivity, although I am not 100% sure why
          });
        },
        template: `<story />`,
      }),
    ],
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

const MULTISELECT_DEMO_OPTIONS = [
  {
    value: "disabled-2",
    label: "Selected unavailable fruit",
    disabled: true,
  },
  ...DEMO_OPTIONS,
  { value: "long", label: "Option with a very long long long  long long long long text" },
];

const LONG_LABELED_DEMO_OPTIONS = Array.from({ length: 10 }, (_, index) => ({
  value: index,
  truncation: "multiline",
  label: `Long labeled option ${index + 1} `.repeat(4),
})) satisfies SelectOption[];

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
 * This example shows a select with a hidden label.
 */
export const HiddenLabel = {
  args: {
    ...Default.args,
    hideLabel: true,
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
    modelValue: [MULTISELECT_DEMO_OPTIONS[0], MULTISELECT_DEMO_OPTIONS[1]],
    multiple: true,
    withCheckAll: true,
    options: MULTISELECT_DEMO_OPTIONS,
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
 * This example shows a required select.
 * Shows an error after selecting and de-selecting an option.
 */
export const Required = {
  args: {
    ...Default.args,
    multiple: true,
    options: MULTISELECT_DEMO_OPTIONS,
    required: true,
  },
} satisfies Story;

/**
 * This example shows a select with a custom error message.
 * Will only be shown after opening + closing the select.
 */
export const CustomError = {
  args: {
    ...Default.args,
    customError: {
      shortMessage: "Example custom error",
      longMessage: "This text might inform the users what they can do to fix the error.",
    },
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
 *
 * **Important**: You need to manually filter the options based on the current `searchTerm`.
 * You can use our `normalizedIncludes()` utility function for this.
 * This example showcases the behavior when using that function.
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

/**
 * This example shows a single select with fully custom option content that can be
 * passed as slot.
 */
export const CustomOptions = {
  args: {
    ...Default.args,
    option: ({ label }) => ["custom ", h("strong", label), " content"],
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

/**
 * This example shows single select with multiline options.
 */
export const MultilineOptions = {
  args: {
    label: "Example select",
    listLabel: "List label",
    options: LONG_LABELED_DEMO_OPTIONS,
    placeholder: "Placeholder...",
  },
} satisfies Story;
