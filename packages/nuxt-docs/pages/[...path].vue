<script setup lang="ts">
const { data } = await useCollection({ collection: "content" });
</script>

<template>
  <ContentRenderer :value="data" />
</template>
