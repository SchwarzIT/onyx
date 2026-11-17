import { computed, useCookie, useHead, useUserSession } from "#imports";
import { INTERNAL_THEMES, type InternalTheme } from "../utils/themes.js";

const COOKIE_NAME = "onyx-internal-theme";

/**
 * Composable for dynamically read and change the Schwarz internal theme.
 */
export const useSchwarzTheme = () => {
  const { loggedIn } = useUserSession();
  const cookie = useCookie<InternalTheme | undefined>(COOKIE_NAME, {
    default: () => INTERNAL_THEMES[0].id,
  });

  const theme = computed<InternalTheme | "default">({
    get: () => {
      return loggedIn.value ? (cookie.value ?? "default") : "default";
    },
    set: (newTheme) => {
      if (!loggedIn.value) return;
      cookie.value = newTheme === "default" ? undefined : newTheme;
    },
  });

  return { theme };
};

/**
 * Provides / applies the current Schwarz internal theme (from `useSchwarzTheme()`) to the
 * application. Should only be used once per application.
 */
export const provideSchwarzTheme = async () => {
  const { theme } = useSchwarzTheme();

  useHead({
    htmlAttrs: {
      // its important to still add the class if the theme is "default" so the default theme is applied
      // even if the CSS files for other themes are imported
      class: computed(() => `onyx-theme-${theme.value}`),
    },
  });

  return { theme };
};
