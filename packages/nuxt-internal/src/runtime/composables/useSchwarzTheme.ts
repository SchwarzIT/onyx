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
export const provideSchwarzTheme = () => {
  const { theme } = useSchwarzTheme();

  useHead(
    computed(() => {
      if (theme.value === "default") return {};
      const href = `/api/themes/${theme.value}/index.css`;

      return {
        htmlAttrs: {
          class: `onyx-theme-${theme.value}`,
        },
        link: [
          { rel: "preload", as: "style", href, key: `theme-preload-${theme.value}` },
          { rel: "stylesheet", href, key: `theme-style-${theme.value}` },
        ],
      } satisfies Parameters<typeof useHead>[0];
    }),
  );

  return { theme };
};
