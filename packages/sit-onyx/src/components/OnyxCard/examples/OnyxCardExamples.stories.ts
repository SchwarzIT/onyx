import type { Meta } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../../utils/storybook";
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

export const HeadlineAndText = await createAdvancedStoryExample("OnyxCard", "HeadlineCardExample");

export const ImageCard = await createAdvancedStoryExample("OnyxCard", "ImageCardExample");

export const IconCard = await createAdvancedStoryExample("OnyxCard", "IconCardExample");

export const DetailsCard = await createAdvancedStoryExample("OnyxCard", "DetailsCardExample");

export const KPICard = await createAdvancedStoryExample("OnyxCard", "KPICardExample");
