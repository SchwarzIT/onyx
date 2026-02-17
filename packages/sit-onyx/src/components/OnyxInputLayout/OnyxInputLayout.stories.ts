import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import OnyxInputLayout from "./OnyxInputLayout.vue";

const meta: Meta<typeof OnyxInputLayout> = {
  title: "Support/InputLayout",
  component: OnyxInputLayout,
  tags: ["unstable"],
  args: {
    style: "max-width: 24rem",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxInputLayout>;

export const Default = {
  args: {
    label: "Example label",
    labelTooltip: "Label tooltip",
    modelValue: "Value",
    withCounter: true,
    maxlength: 64,
    required: true,
    message: {
      shortMessage: "Short message",
      longMessage: "Long message",
    },
    leadingIcons: () => [h(OnyxIcon, { icon: iconPlaceholder })],
    trailingIcons: () => [h(OnyxIcon, { icon: iconPlaceholder })],
    default: ({ id }) => h("input", { class: "onyx-input-layout__native", id }),
  },
} satisfies Story;

export const Slots = {
  args: {
    ...Default.args,
    leading: () =>
      h(OnyxSelect, {
        label: "Label",
        listLabel: "List label",
        hideLabel: true,
        options: [{ label: "Option 1", value: 1 }],
        placeholder: "Leading",
        alignment: "left",
      }),
    trailing: () =>
      h(OnyxSelect, {
        label: "Label",
        listLabel: "List label",
        hideLabel: true,
        options: [{ label: "Option 1", value: 1 }],
        placeholder: "Trailing",
        alignment: "right",
      }),
  },
} satisfies Story;
