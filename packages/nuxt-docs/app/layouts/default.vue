<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";
import { iconSearch } from "@sit-onyx/icons";
import { normalizedIncludes, type OnyxPageLayoutProps, type OnyxSidebarProps } from "sit-onyx";

const props = defineProps<
  OnyxPageLayoutProps & {
    sidebar?: OnyxSidebarProps;
  }
>();

const slots = defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
  /**
   * Page footer content.
   */
  footer?(): unknown;
  /**
   * Optional right sidebar.
   */
  sidebarRight?(): unknown;
  /**
   * Optionally override the main sidebar body content.
   */
  sidebarBody?(props: { items: ContentNavigationItem[] }): unknown;
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
  <OnyxPageLayout v-bind="props">
    <template #sidebar>
      <OnyxSidebar
        class="sidebar"
        v-bind="props.sidebar"
        :label="$t('onyx.navigation.navigationHeadline')"
      >
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

        <slot name="sidebarBody" :items="filteredSidebarItems">
          <SidebarItem
            v-for="item in filteredSidebarItems"
            :key="localePath(item.path)"
            :item="item"
          />

          <OnyxEmpty v-if="!filteredSidebarItems.length" class="sidebar__empty">
            {{ $t("onyx.select.empty") }}
          </OnyxEmpty>
        </slot>

        <template v-if="!!slots.sidebarFooter" #footer>
          <slot name="sidebarFooter"></slot>
        </template>
      </OnyxSidebar>
    </template>

    <slot></slot>

    <template v-if="!!slots.footer" #footer>
      <slot name="footer"></slot>
    </template>

    <template v-if="!!slots.sidebarRight" #sidebarRight>
      <slot name="sidebarRight"></slot>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.content {
  white-space: pre-line;
}

.sidebar {
  &__empty {
    max-width: 100%;
  }
}
</style>
