<script lang="ts" setup>
import SidebarLayout from "#layers/onyx/app/layouts/sidebar.vue";

defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
}>();

const { locale } = useI18n();

const { data: collection } = await useCollection({
  collection: computed(() => `content_${locale.value}` as const),
});
</script>

<template>
  <SidebarLayout>
    <template #hero>
      <PageContentHero
        :headline="collection.title"
        :description="collection.description"
        :image="collection.hero?.image"
      />
    </template>

    <slot></slot>
  </SidebarLayout>
</template>
