<script setup lang="ts">
import type { Collections } from "@nuxt/content";

definePageMeta({ layout: "sidebar" });

const { locale } = useI18n();

const { data } = await useCollection({
  collection: computed(() => `content_${locale.value}` as keyof Collections),
});
</script>

<template>
  <ContentRenderer :value="data" />
</template>
