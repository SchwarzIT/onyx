import bell from "@sit-onyx/icons/bell.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxNotificationDot from "./OnyxNotificationDot.vue";

const meta: Meta<typeof OnyxNotificationDot> = {
  title: "Support/NotificationDot",
  component: OnyxNotificationDot,
  argTypes: {
    visible: {
      control: { type: "boolean" },
      description: "Use this property to make the indicator visible. The default value is false.",
    },
    pulsing: {
      control: { type: "boolean" },
      description: "Use this property to make the indicator pulsing. The default value is false.",
    },
    bouncing: {
      control: { type: "boolean" },
      description: "Use this property to make the indicator bouncing. The default value is false.",
    },
    position: {
      control: { type: "object" },
      description:
        'Use this property to set a specific position of the indicator (working with position: "absolute")',
    },
    color: {
      type: "string",
      control: "select",
      options: ["primary", "secondary", "neutral", "danger", "warning", "success", "info"],
      description: "Use this property to set the color of the indicator.",
    },
    default: {
      control: { disable: true },
      description: "The base component of the notification indicator.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNotificationDot>;

export const StaticWithIconButton = () =>
  ({
    args: {},
    render() {
      return h(
        OnyxNotificationDot,
        { visible: true, position: { top: "0.1875rem", right: "0.3125rem" }, color: "success" },
        {
          default: () => h(OnyxIconButton, { icon: bell, label: "" }, []),
        },
      );
    },
  }) satisfies Story;

export const PulsingWithIconButton = () =>
  ({
    args: {},
    render() {
      return h(
        OnyxNotificationDot,
        {
          visible: true,
          pulsing: true,
          position: { top: "0.1875rem", right: "0.3125rem" },
          color: "success",
        },
        {
          default: () => h(OnyxIconButton, { icon: bell, label: "" }, []),
        },
      );
    },
  }) satisfies Story;

export const BouncingWithIconButton = () =>
  ({
    args: {},
    render() {
      return h(
        OnyxNotificationDot,
        {
          visible: true,
          bouncing: true,
          position: { top: "0.1875rem", right: "0.3125rem" },
          color: "success",
        },
        {
          default: () => h(OnyxIconButton, { icon: bell, label: "" }, []),
        },
      );
    },
  }) satisfies Story;

export const ExampleWithContainer = () =>
  ({
    args: {},
    render() {
      return h(
        OnyxNotificationDot,
        { visible: true, pulsing: true, position: { top: "1.25rem", right: "0.625rem" } },
        {
          default: () =>
            h(
              "div",
              { style: "background-color: white; padding: 0.625rem; border: 0.0625rem solid" },
              [
                h("div", { style: "display: flex; flex-direction: row;" }, [
                  h(OnyxHeadline, { is: "h2" }, "Notifications"),
                ]),
                h(
                  "div",
                  {
                    style:
                      "color: #95a1aa; font-size: 0.8125rem; line-height: 1.25rem; margin-top: 0.25rem;",
                  },
                  "See all notifications from all touchpoints here.",
                ),
              ],
            ),
        },
      );
    },
  }) satisfies Story;
