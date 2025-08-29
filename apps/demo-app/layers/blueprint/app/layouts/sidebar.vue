<script lang="ts" setup>
import { iconSearch, iconSidebarArrowLeft, iconSidebarArrowRight } from "@sit-onyx/icons";
import { normalizedIncludes } from "sit-onyx";

const props = defineProps<{
  sidebarItems: SidebarItem[];
}>();

defineSlots<{
  /**
   * Page content.
   */
  default(): unknown;
}>();

const search = ref("");

const filteredItems = computed(() => {
  const searchTerm = search.value.trim();
  if (!searchTerm) return props.sidebarItems;
  return props.sidebarItems.filter((item) => normalizedIncludes(item.label, searchTerm));
});

const isOpen = ref(true);
</script>

<template>
  <OnyxPageLayout v-bind="props">
    <template #sidebar>
      <!-- using v-show here instead of v-if so the search value is kept when toggling the open state -->
      <OnyxSidebar v-show="isOpen" class="sidebar" :label="$t('blueprint.sidebar')">
        <template #header>
          <OnyxInput
            v-model="search"
            :label="$t('blueprint.search')"
            :placeholder="`${$t('blueprint.search')}...`"
            type="search"
            hide-label
          >
            <template #leading>
              <OnyxIcon :icon="iconSearch" />
            </template>
          </OnyxInput>
        </template>

        <div class="sidebar__content">
          <OnyxSidebarItem v-for="item in filteredItems" :key="item.label" v-bind="item">
            <OnyxIcon v-if="item.icon" :icon="item.icon" />
            {{ item.label }}
          </OnyxSidebarItem>

          <OnyxEmpty v-if="!filteredItems.length" class="sidebar__empty">
            {{ $t("blueprint.noItemsFound") }}
          </OnyxEmpty>
        </div>
      </OnyxSidebar>
    </template>

    <slot></slot>

    <OnyxFAB
      :label="$t('blueprint.toggleSidebar')"
      alignment="left"
      :icon="isOpen ? iconSidebarArrowLeft : iconSidebarArrowRight"
      hide-label
      @click="isOpen = !isOpen"
    />
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.sidebar {
  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }

  &__empty {
    align-self: center;
  }
}
</style>
