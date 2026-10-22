<script lang="ts" setup>
import { iconGrid, iconSearchX } from "@sit-onyx/icons";
import { normalizedIncludes } from "sit-onyx";

defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
  /**
   * Optional full width hero content.
   */
  hero?(): unknown;
}>();

const { locale } = useI18n();

const { navigation } = await useSidebarNavigation({
  collection: computed(() => `components_${locale.value}` as const),
  fields: ["status", "componentName"],
});

const searchTerm = ref("");

const filteredNavigation = computed(() => {
  const search = searchTerm.value.trim();
  if (!search) return navigation.value;

  return navigation.value
    .map((item) => {
      return {
        ...item,
        children: item.children?.filter((child) => {
          // support searching by title and componentName
          return (
            normalizedIncludes(child.title, search) ||
            (child.fields?.componentName && normalizedIncludes(child.fields.componentName, search))
          );
        }),
      };
    })
    .filter((item) => item.children?.length);
});
</script>

<template>
  <OnyxPageLayout no-padding>
    <template #sidebar>
      <OnyxSidebar class="sidebar" :label="$t('onyx.navigation.navigationHeadline')">
        <template #header>
          <OnyxSidebarItem link="/components">
            <OnyxIcon :icon="iconGrid" />
            <span>{{ $t("components.all") }}</span>
          </OnyxSidebarItem>

          <OnyxUnstableSearch v-model="searchTerm" corner-radius="strong" with-shortcut />
        </template>

        <OnyxEmpty v-if="!filteredNavigation.length" class="sidebar__empty">
          {{ $t("components.noMatches") }}

          <template #buttons>
            <OnyxButton
              :label="$t('clearSearch')"
              :icon="iconSearchX"
              color="neutral"
              @click="searchTerm = ''"
            />
          </template>
        </OnyxEmpty>

        <NestableSidebarItem
          v-for="item in filteredNavigation"
          :key="item.path"
          :item
          type="nested-small"
        >
          <template #trailing="{ item: currentItem }">
            <ComponentStatusTag
              v-if="currentItem.fields?.status"
              :status="currentItem.fields.status"
            />
          </template>
        </NestableSidebarItem>
      </OnyxSidebar>
    </template>

    <slot name="hero"></slot>

    <div class="onyx-grid-layout">
      <slot></slot>
    </div>

    <Footer />
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  :deep(.onyx-sidebar__header) {
    padding-top: var(--onyx-density-xl);
    gap: var(--onyx-density-lg);
  }

  &__empty {
    max-width: 100%;
  }
}
</style>
