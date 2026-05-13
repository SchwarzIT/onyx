<script setup lang="ts">
import type { Collections } from "@nuxt/content";

definePageMeta({ layout: "sidebar" });

const { locale } = useI18n();

const { data } = await useCollection({
  collection: computed(() => `content_${locale.value}` as keyof Collections),
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if  -- The "useCollection" will already redirect to the error page when the data is undefined but the data might still be undefined while e.g. switching to another page -->
<template>
  <ContentRenderer v-if="data" :value="data" />
</template>
