<script setup lang="ts">
const route = useRoute();
const { data } = await useAsyncData(() => queryCollection("content").path(route.path).first());

useSeoMeta({
  ...data.value?.seo,
});
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
  <OnyxEmpty v-else> Page not found. </OnyxEmpty>
</template>
