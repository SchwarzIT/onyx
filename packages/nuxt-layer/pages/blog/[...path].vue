<script setup lang="ts">
const route = useRoute();

const slug = route.params.slug;
const { data } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection("blog").path(route.path).first(),
);

definePageMeta({
  layout: "blog",
});

useSeoMeta({
  ...data.value?.seo,
});
</script>

<template>
  <div class="post">
    <OnyxEmpty v-if="!data"> Page not found. </OnyxEmpty>

    <template v-else>
      <img class="post__image" alt="Hero image" :src="data.image" />
      <ContentRenderer :value="data" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.post {
  &__image {
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}
</style>
