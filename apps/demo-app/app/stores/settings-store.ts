import { defineStore } from "pinia";
import type { Density } from "sit-onyx";

export type UserSettings = {
  density: Density;
};

export const useSettingsStore = defineStore("settings", () => {
  const settings = useCookie<UserSettings>("settings", {
    default: () => ({ density: "default" }),
    sameSite: "lax",
  });
  return { settings };
});
