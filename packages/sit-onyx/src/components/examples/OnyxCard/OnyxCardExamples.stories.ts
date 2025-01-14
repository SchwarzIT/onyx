import calendarClock from "@sit-onyx/icons/calendar-clock.svg?raw";
import expandWindow from "@sit-onyx/icons/expand-window.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxCard from "../../OnyxCard/OnyxCard.vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";

const meta: Meta<typeof OnyxCard> = {
  title: "Basic/Card/Examples",
  component: OnyxCard,
  tags: ["!autodocs"],
  argTypes: {
    style: { table: { disable: true } },
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCard>;

export const HeadlineAndText = {
  args: {
    style: "width: 20rem;",
    default: [
      h(OnyxHeadline, { is: "h2" }, () => "Example headline"),
      "Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat. Vel nec aliquet lorem turpis eu dui. At pellentesque senectus sed volutpat vitae nulla. Nisl cursus dignissim sed eget neque tristique interdum pretium elit.",
    ],
  },
} satisfies Story;

export const ImageCard = {
  args: {
    style: "width: 20rem;",
    default: [
      h("img", {
        src: "https://picsum.photos/256/128",
        alt: "Example image",
        style:
          "border-radius: var(--onyx-radius-sm); margin-bottom: var(--onyx-card-gap); background-color: var(--onyx-color-base-neutral-200)",
        height: 128,
      }),
      h(OnyxHeadline, { is: "h2" }, "Example headline"),
      "Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat. Vel nec aliquet lorem turpis eu dui. At pellentesque senectus sed volutpat vitae nulla. Nisl cursus dignissim sed eget neque tristique interdum pretium elit.",
    ],
  },
} satisfies Story;

export const IconCard = {
  args: {
    style: "width: 18rem; flex-direction: row; gap: var(--onyx-density-md); align-items: center",
    default: [
      h(OnyxIcon, { icon: calendarClock, size: "64px", color: "primary" }),
      h("div", [
        h("div", { style: "display: flex; justify-content: space-between;" }, [
          h(OnyxHeadline, { is: "h2" }, () => "Headline"),
          h(OnyxSystemButton, { icon: expandWindow, label: "Open link" }),
        ]),
        "Lorem ipsum dolor sit amet consectetur.",
      ]),
    ],
  },
} satisfies Story;
