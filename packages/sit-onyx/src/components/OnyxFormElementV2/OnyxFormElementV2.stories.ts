import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import OnyxFormElementV2 from "./OnyxFormElementV2.vue";

const meta: Meta<typeof OnyxFormElementV2> = {
  title: "Support/FormElementV2",
  component: OnyxFormElementV2,
  tags: ["unstable"],
  args: {
    style: "max-width: 32rem",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxFormElementV2>;

export const Default = {
  args: {
    label: "Example form element",
    default: (props) => h("input", props),
  },
} satisfies Story;

export const Icons = {
  args: {
    ...Default.args,
    leadingIcons: () => [h(OnyxIcon, { icon: iconPlaceholder })],
    trailingIcons: () => [
      h(OnyxIcon, { icon: iconPlaceholder }),
      h(OnyxIcon, { icon: iconPlaceholder }),
    ],
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
        options: [{ label: "+49", value: "#49" }],
        placeholder: "+49",
        alignment: "left",
      }),
    trailing: () =>
      h(OnyxSelect, {
        label: "Label",
        listLabel: "List label",
        hideLabel: true,
        options: [{ label: "kg", value: "kg" }],
        placeholder: "kg",
        alignment: "right",
      }),
  },
} satisfies Story;

export const AllSlots = {
  args: {
    ...Icons.args,
    ...Slots.args,
  },
} satisfies Story;
