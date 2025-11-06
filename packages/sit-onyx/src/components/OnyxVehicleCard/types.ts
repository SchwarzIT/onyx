import type { DensityProp } from "../../composables/density.js";

export type OnyxVehicleCardProps = DensityProp & {
  name: string;
  image: string;
  pickup: VehicleLocation;
  return: VehicleLocation;
};

export type VehicleLocation = {
  location: string;
  date: string;
  time: string;
};
