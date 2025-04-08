<script setup lang="ts">
const route = useRoute();
const collection = await useAsyncData(() => queryCollection("content").path(route.path).first());

if (!collection.data.value) {
  throw createError({
    message: "Page not found",
    statusCode: 404,
  });
}

const data = toRef(() => collection.data.value!);
useSeoMeta({ ...data.value.seo });
</script>

<!-- eslint-disable-next-line vue/no-root-v-if  -- the v-if here is theoretically not needed because we throw above it ifs undefined so the user will be redirected to the error page. However, there is still a console warning so we include the v-if here to prevent it. -->
<template>
  <ContentRenderer v-if="data" :value="data" />
</template>
