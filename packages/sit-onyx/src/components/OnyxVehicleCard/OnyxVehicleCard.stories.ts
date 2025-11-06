import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxVehicleCard from "./OnyxVehicleCard.vue";
import exampleImage from "./example-image.png";

const meta: Meta<typeof OnyxVehicleCard> = {
  title: "Cards/VehicleCard",
  component: OnyxVehicleCard,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxVehicleCard>;

export const Default = {
  args: {
    name: "BMW i8",
    image: exampleImage,
    pickup: {
      location: "Downtown Branch",
      date: "12/20/2025",
      time: "10:00 am",
    },
    return: {
      location: "Airport Branch",
      date: "01/05/2026",
      time: "11:30 am",
    },
  },
} satisfies Story;
