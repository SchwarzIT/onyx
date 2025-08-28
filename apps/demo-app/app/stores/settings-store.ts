import { useLocalStorage } from "@vueuse/core";
import { defineStore, skipHydrate } from "pinia";
import type { Density } from "sit-onyx";

export type UserSettings = {
  density: Density;
};

export const useSettingsStore = defineStore("settings", () => {
  const settings = useLocalStorage<UserSettings>(
    "settings",
    {
      density: "default",
    } satisfies UserSettings,
    { writeDefaults: false, initOnMounted: true },
  );

  return {
    settings: skipHydrate(settings),
  };
});
