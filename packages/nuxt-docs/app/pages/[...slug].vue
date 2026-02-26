<script setup lang="ts">
definePageMeta({ layout: "sidebar" });

const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => {
  const path = Array.isArray(route.params.slug)
    ? route.params.slug.join("/")
    : (route.params.slug ?? "");
  return path.startsWith("/") ? path : `/${path}`;
});

const collection = await useAsyncData(
  () => `page-${slug.value}-${locale.value}`,
  () => {
    const collection = `content_${locale.value}` as const;
    return queryCollection(collection).path(slug.value).first();
  },
);

watch(
  () => collection.data.value,
  (data) => {
    // if data is "null", the page content was not found. "undefined" means it is not loaded yet
    if (data !== null) return;
    throw showError({
      message: "Page not found",
      statusCode: 404,
    });
  },
  { immediate: true },
);

const data = computed(() => collection.data.value);

useSeoMeta({
  title: computed(() => collection.data.value?.seo.title),
  description: computed(() => collection.data.value?.seo.description),
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if  -- the v-if here is theoretically not needed because we throw above it ifs undefined so the user will be redirected to the error page. However, there is still a console warning so we include the v-if here to prevent it. -->
<template>
  <div class="content">
    <ContentRenderer v-if="data" :value="data" />

    <TableOfContents
      v-if="data?.body.toc?.links.length"
      class="content__toc"
      :links="data.body.toc.links"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.content {
  --onyx-content-toc-gap: calc(2 * var(--onyx-grid-gutter) + (100 / var(--onyx-grid-columns)) * 1%);
  display: grid;
  gap: var(--onyx-content-toc-gap);

  // see: https://storybook.onyx.schwarz/?path=/docs/navigation-tableofcontents--docs
  grid-template-columns: 1fr minmax(8rem, 15rem);

  &__toc {
    position: sticky;
    top: var(--onyx-grid-margin-vertical);
    height: calc(100vh - 3 * var(--onyx-grid-margin-vertical));
  }

  // hide TOC on smaller screens
  @include breakpoints.container(max, md) {
    grid-template-columns: 1fr;

    .content__toc {
      display: none;
    }
  }
}
</style>
