<script lang="ts" setup>
defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
}>();

const { locale } = useI18n();

const { navigation } = await useSidebarNavigation({
  collection: computed(() => `components_${locale.value}` as const),
});
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <OnyxSidebar label="Label">
        <NestableSidebarItem
          :item="{
            title: $t('components.all'),
            path: '/components',
          }"
        />

        <!-- TODO: add custom content like tags for new, unstable etc. -->
        <NestableSidebarItem v-for="item in navigation" :key="item.path" :item />
      </OnyxSidebar>
    </template>

    <slot></slot>
  </OnyxPageLayout>
</template>
