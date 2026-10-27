<script lang="ts" setup>
import App from "#layers/onyx/app/app.vue";

const config = useRuntimeConfig();
const { t } = useI18n();

const siteName = computed(() => t("app.name"));
const description = computed(() => t("app.description"));

// define global defaults, individual fields will be overridden by specific pages / components
useSeoMeta({
  titleTemplate: (pageTitle) => {
    return pageTitle ? `${pageTitle} | ${siteName.value}` : siteName.value;
  },
  ogTitle: siteName,
  ogSiteName: siteName,
  description,
  ogDescription: description,
  ogImage: `${config.public.domain}/og-image.png`,
  ogImageType: "image/png",
  ogImageWidth: "600",
  ogImageHeight: "600",
});
</script>

<template>
  <App />
</template>
