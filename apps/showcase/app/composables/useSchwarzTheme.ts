export const useSchwarzTheme = async () => {
  const { loggedIn } = useUserSession();
  const theme = ref(INTERNAL_THEMES[0]);

  useHead(
    computed(() => {
      if (!loggedIn.value) return {};
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
};
