<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { NuxtError, NuxtLayouts } from "#app";

definePageMeta({ layout: false });

const { locale } = useI18n();

const error = ref<NuxtError>();

const { data, error: collectionError } = await useCollection({
  collection: computed(() => `content_${locale.value}` as keyof Collections),
});

watch(
  [data, collectionError],
  () => {
    if (collectionError.value) {
      error.value = collectionError.value;
    } else if (!data.value) {
      error.value = createError({ status: 404, message: "Page not found", fatal: true });
    } else {
      error.value = undefined;
    }
  },
  { immediate: true },
);

useSeoMeta({
  title: () => data.value?.seo.title,
  description: () => data.value?.seo.description,
});

const layout = computed<keyof NuxtLayouts>(() => {
  const layout = data.value?.meta.layout;
  if (layout && typeof layout === "string") return layout as keyof NuxtLayouts;
  return "sidebar";
});
</script>

<template>
  <NuxtLayout :name="layout">
    <OnyxError v-if="error" :error="error" />
    <ContentRenderer v-else-if="data" :value="data" />
  </NuxtLayout>
</template>
