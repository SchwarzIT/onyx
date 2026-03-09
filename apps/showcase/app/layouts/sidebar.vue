<script lang="ts" setup>
import SidebarLayout from "#layers/onyx/app/layouts/sidebar.vue";

defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
}>();

const { data } = await useCollection();
</script>

<template>
  <SidebarLayout>
    <template #hero>
      <PageContentHero
        :headline="data?.title"
        :description="data?.description"
        :image="data?.hero?.image"
      />
    </template>

    <slot></slot>
  </SidebarLayout>
</template>
