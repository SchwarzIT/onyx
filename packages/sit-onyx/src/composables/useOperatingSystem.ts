import { onBeforeMount, ref } from "vue";

export const OPERATING_SYSTEMS = ["macOS", "windows", "generic"] as const;
export type OperatingSystem = (typeof OPERATING_SYSTEMS)[number];

/**
 * Composable for SSR save detecting of the user's operating system.
 */
export const useOperatingSystem = () => {
  const os = ref<OperatingSystem>("generic");

  onBeforeMount(() => {
    const userAgent = globalThis.navigator ? navigator.userAgent.toLowerCase() : "";

    if (userAgent.includes("windows")) {
      os.value = "windows";
    } else if (userAgent.includes("macintosh") || userAgent.includes("mac os x")) {
      os.value = "macOS";
    } else {
      os.value = "generic";
    }
  });

  return { os };
};
