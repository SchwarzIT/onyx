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
  fields: ["status"],
});
</script>

<template>
  <OnyxPageLayout>
    <template #sidebar>
      <OnyxSidebar :label="$t('onyx.navigation.navigationHeadline')">
        <NestableSidebarItem
          :item="{
            title: $t('components.all'),
            path: '/components',
          }"
        />

        <NestableSidebarItem v-for="item in navigation" :key="item.path" :item>
          <template #trailing="{ item: currentItem }">
            <ComponentStatusTag
              v-if="currentItem.fields?.status"
              :status="currentItem.fields.status"
            />
          </template>
        </NestableSidebarItem>
      </OnyxSidebar>
    </template>

    <slot></slot>
  </OnyxPageLayout>
</template>
