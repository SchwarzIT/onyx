import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxSupportDialog from "./OnyxSupportDialog.vue";
import type { OnyxSupportDialogProps } from "./types";

const meta: Meta<typeof OnyxSupportDialog> = {
  title: "Support/SupportDialog",
  component: OnyxSupportDialog,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    closable: {
      type: "boolean",
      control: "boolean",
      description: "Show/hide the close button of the sidebar.",
    },
    position: {
      type: "string",
      control: "select",
      options: ["right", "left"],
      description: "Set the position of the sidebar.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSupportDialog>;

export const Default = {
  args: {
    closable: false,
    closeOnOutsideClick: false,
    position: "left",
  },
} satisfies Story;

export const CustomHeader = (args: OnyxSupportDialogProps) =>
  ({
    args: {
      closable: true,
      position: "right",
    },
    render() {
      return h(
        OnyxSupportDialog,
        { ...args },
        {
          header: () =>
            h("div", {}, [
              h("div", { style: "display: flex; flex-direction: row;" }, [
                h(OnyxHeadline, { is: "h2" }, "Notifications"),
                h(OnyxBadge, { color: "neutral", style: "margin-left: 1rem;" }, "32"),
              ]),
              h(
                "div",
                {
                  style:
                    "color: #95a1aa; font-size: 0.8125rem; line-height: 1.25rem; margin-top: 0.25rem;",
                },
                "See all notifications from all touchpoints here.",
              ),
            ]),
        },
      );
    },
  }) satisfies Story;

export const CustomFooter = (args: OnyxSupportDialogProps) =>
  ({
    args: {
      closable: true,
      position: "right",
    },
    render() {
      return h(
        OnyxSupportDialog,
        { ...args },
        {
          footer: () =>
            h("div", { style: "display: flex" }, [
              h(OnyxIconButton, { icon: settings, color: "neutral", label: "Settings" }),
              h(OnyxButton, {
                color: "neutral",
                density: "compact",
                icon: checkSmall,
                label: "Mark all as read",
              }),
            ]),
        },
      );
    },
  }) satisfies Story;
