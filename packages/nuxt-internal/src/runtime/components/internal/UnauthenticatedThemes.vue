<script lang="ts" setup>
import { computed, useHead, useSchwarzTheme } from "#imports";
import "@onyx-internal/digits-theme";
import "@onyx-internal/prezero-theme";
import "@onyx-internal/kaufland-theme";
import "@onyx-internal/lidl-theme";
import "@onyx-internal/schwarzgroup-scos-theme";
import "@onyx-internal/tailwind-theme";
// ?inline tells Vite to treat the CSS as a plain string instead of extracting a stylesheet
// import digitsTheme from "@onyx-internal/digits-theme/index.css?inline";
// import kauflandTheme from "@onyx-internal/kaufland-theme/index.css?inline";
// import lidlTheme from "@onyx-internal/lidl-theme/index.css?inline";
// import prezeroTheme from "@onyx-internal/prezero-theme/index.css?inline";
// import schwarzTheme from "@onyx-internal/schwarzgroup-scos-theme/index.css?inline";
// import tailwindTheme from "@onyx-internal/tailwind-theme/index.css?inline";

const { theme } = useSchwarzTheme();

// const themesMap: Record<string, string> = {
//   digits: digitsTheme,
//   prezero: prezeroTheme,
//   kaufland: kauflandTheme,
//   lidl: lidlTheme,
//   schwarzgroup: schwarzTheme,
//   tailwind: tailwindTheme,
// };

useHead({
  htmlAttrs: {
    // its important to still add the class if the theme is "default" so the default theme is applied
    // even if the CSS files for other themes are imported
    class: computed(() => `onyx-theme-${theme.value}`),
  },
  // Injects <style> tags ONLY when this component is mounted
  //   style: computed(() => {
  //     const activeCss = themesMap[theme.value];
  //     return activeCss ? [{ id: "active-theme", innerHTML: activeCss }] : [];
  //   }),
});
</script>

<template>
  <div></div>
</template>
