import type { Meta } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook.js";
import OnyxCard from "../../OnyxCard/OnyxCard.vue";

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

export const HeadlineAndText = createAdvancedStoryExample("OnyxCard", "HeadlineCardExample");

export const ImageCard = createAdvancedStoryExample("OnyxCard", "ImageCardExample");

export const IconCard = createAdvancedStoryExample("OnyxCard", "IconCardExample");

export const DetailsCard = createAdvancedStoryExample("OnyxCard", "DetailsCardExample");

export const KPICard = createAdvancedStoryExample("OnyxCard", "KPICardExample");
