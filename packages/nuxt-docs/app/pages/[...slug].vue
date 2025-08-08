<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale } = useI18n();
const slug = computed(() => {
  const value = String(route.params.slug);
  return value.startsWith("/") ? value : `/${value}`;
});

const collection = await useAsyncData(
  () => `page-${slug.value}-${locale.value}`,
  () => {
    const collection = `content_${locale.value}` as keyof Collections;
    return queryCollection(collection).path(slug.value).first();
  },
);

watch(
  () => collection.data.value,
  (data) => {
    // if data is "null", the page content was not found. "undefined" means it is not loaded yet
    if (data !== null) return;
    throw showError({
      message: "Page not found",
      statusCode: 404,
    });
  },
  { immediate: true },
);

const data = computed(() => collection.data.value);

useSeoMeta({
  title: computed(() => collection.data.value?.seo.title),
  description: computed(() => collection.data.value?.seo.description),
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if  -- the v-if here is theoretically not needed because we throw above it ifs undefined so the user will be redirected to the error page. However, there is still a console warning so we include the v-if here to prevent it. -->
<template>
  <ContentRenderer v-if="data" :value="data" />
</template>
