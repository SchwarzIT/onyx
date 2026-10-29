export const useSchwarzTheme = async () => {
  // TODO: error handling
  // TODO: refetch when user changes

  const theme = ref(INTERNAL_THEMES[0]);

  useHead({
    link: computed(() => {
      if (!theme.value) return [];
      const href = `/api/themes/${theme.value}/index.css`;
      return [
        { rel: "preload", as: "style", href, key: `theme-preload-${theme.value}` },
        { rel: "stylesheet", href, key: `theme-style-${theme.value}` },
      ];
    }),
    htmlAttrs: {
      class: theme.value ? `onyx-theme-${theme.value}` : undefined,
    },
  });
};
