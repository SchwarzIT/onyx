<script lang="ts" setup>
import SidebarLayout from "#layers/onyx/app/layouts/sidebar.vue";

const props = defineProps<{
  /**
   * Whether to hide the page hero.
   */
  hideHero?: boolean;
  collectionOptions?: UseCollectionOptions;
}>();

defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
}>();

const { data } = await useCollection(computed(() => props.collectionOptions));
</script>

<template>
  <SidebarLayout :collection-options="props.collectionOptions">
    <template v-if="!props.hideHero" #hero>
      <PageContentHero
        :headline="data?.title"
        :description="data?.description"
        :image="data?.hero?.image"
      />
    </template>

    <slot></slot>
  </SidebarLayout>
</template>
