<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";
import { iconSearch } from "@sit-onyx/icons";
import { normalizedIncludes } from "sit-onyx";

const slots = defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
  /**
   * Optionally override the sidebar header content.
   */
  sidebarHeader?(): unknown;
  /**
   * Sidebar footer content.
   */
  sidebarFooter?(): unknown;
}>();

const { locale } = useI18n();
const localePath = useLocalePath();

const navigation = await useAsyncData(
  () => `navigation-${locale.value}`,
  () => {
    const collection = `content_${locale.value}` as const;
    return queryCollectionNavigation(collection);
  },
);

const searchTerm = ref("");

const allSidebarItems = computed(() => navigation.data.value ?? []);

const filterItem = (
  item: ContentNavigationItem,
  search: string,
): ContentNavigationItem | undefined => {
  if (!item.children) {
    return normalizedIncludes(item.title, search) ? item : undefined;
  }

  const children = item.children
    .map((child) => filterItem(child, search))
    .filter((child) => child != undefined);

  if (!children.length) return undefined;
  return { ...item, children };
};

const filteredSidebarItems = computed(() => {
  if (!searchTerm.value) return allSidebarItems.value;

  const items = allSidebarItems.value
    .map((item) => filterItem(item, searchTerm.value))
    .filter((item) => item != undefined);

  return items;
});
</script>

<template>
  <OnyxPageLayout no-padding>
    <template #sidebar>
      <OnyxSidebar class="sidebar" :label="$t('onyx.navigation.navigationHeadline')">
        <template #header>
          <slot name="sidebarHeader">
            <OnyxInput
              v-model="searchTerm"
              :label="$t('onyx.select.searchPlaceholder')"
              hide-label
              :placeholder="$t('onyx.select.searchPlaceholder')"
            >
              <template #leading>
                <OnyxIcon :icon="iconSearch" />
              </template>
            </OnyxInput>
          </slot>
        </template>

        <SidebarItem
          v-for="item in filteredSidebarItems"
          :key="localePath(item.path)"
          :item="item"
        />

        <template v-if="!!slots.sidebarFooter" #footer>
          <slot name="sidebarFooter"></slot>
        </template>
      </OnyxSidebar>
    </template>

    <div class="onyx-grid-layout content">
      <slot></slot>
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.content {
  white-space: pre-line;
}
</style>
