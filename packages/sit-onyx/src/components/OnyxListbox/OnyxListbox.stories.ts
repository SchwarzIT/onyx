import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxListbox from "./OnyxListbox.vue";

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
    events: ["update:modelValue"],
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
