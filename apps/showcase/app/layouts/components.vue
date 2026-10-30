<script lang="ts" setup>
import { iconSearchX } from "@sit-onyx/icons";

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

const { navigation } = await useComponentsNavigation();
const { searchTerm, getFilteredComponents } = useComponentSearch();
const filteredNavigation = computed(() => getFilteredComponents.value(navigation.value));
</script>

<template>
  <OnyxPageLayout no-padding>
    <template #sidebar>
      <OnyxSidebar class="sidebar" :label="$t('onyx.navigation.navigationHeadline')">
        <template #header>
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

    :deep(.onyx-empty-svg) {
      display: none;
    }
  }
}
</style>
