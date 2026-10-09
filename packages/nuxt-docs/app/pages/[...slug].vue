<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { NuxtLayouts } from "#app";

definePageMeta({ layout: false });

const { locale } = useI18n();

const { data, error } = await useCollection({
  collection: computed(() => `content_${locale.value}` as keyof Collections),
});

watch(
  error,
  async () => {
    if (error.value) showError(error.value);
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
    <ContentRenderer v-if="data" :value="data" />
  </NuxtLayout>
</template>
