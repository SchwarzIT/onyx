<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData(() => queryCollection("content").path(route.path).first());

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
  <OnyxEmpty v-else> Page not found. </OnyxEmpty>
</template>
