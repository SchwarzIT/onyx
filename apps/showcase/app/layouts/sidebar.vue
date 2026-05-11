<script lang="ts" setup>
import SidebarLayout from "#layers/onyx/app/layouts/sidebar.vue";

const props = defineProps<{
  /**
   * Whether to hide the page hero.
   */
  hideHero?: boolean;
}>();

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
