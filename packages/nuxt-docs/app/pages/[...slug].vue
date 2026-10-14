<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import type { NuxtLayouts } from "#app";

definePageMeta({ layout: false });

const { locale } = useI18n();

const { data, error } = await useCollection({
  collection: computed(() => `content_${locale.value}` as keyof Collections),
});

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
    <ErrorDetails v-if="error" :error />
    <ContentRenderer v-else-if="data" :value="data" />
  </NuxtLayout>
</template>
