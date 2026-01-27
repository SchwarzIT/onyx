<script lang="ts" setup>
import { iconSearch, iconSidebarArrowLeft, iconSidebarArrowRight } from "@sit-onyx/icons";
import { normalizedIncludes, ONYX_BREAKPOINTS, useGlobalFAB } from "sit-onyx";

const props = defineProps<{
  sidebarItems: SidebarItem[];
}>();

const slots = defineSlots<{
  /**
   * Page content.
   */
  default(): unknown;
  /**
   * Optional footer content.
   */
  footer?(): unknown;
}>();

const search = ref("");

const filteredItems = computed(() => {
  const searchTerm = search.value.trim();
  if (!searchTerm) return props.sidebarItems;
  return props.sidebarItems.filter((item) => normalizedIncludes(item.label, searchTerm));
});

const isOpen = ref(true);
const isMobileOpen = ref(false);

const globalFAB = useGlobalFAB();

const id = useId();

const handleClick = () => {
  return width.value < ONYX_BREAKPOINTS.sm
    ? (isMobileOpen.value = !isMobileOpen.value)
    : (isOpen.value = !isOpen.value);
};
globalFAB.add(
  computed(() => ({
    id,
    label: $t("blueprint.toggleSidebar"),
    icon:
      (width.value < ONYX_BREAKPOINTS.sm && isMobileOpen.value) ||
      (isOpen.value && width.value >= ONYX_BREAKPOINTS.sm)
        ? iconSidebarArrowLeft
        : iconSidebarArrowRight,
    onClick: handleClick,
    alignment: "left",
  })),
);
onUnmounted(() => {
  globalFAB.remove(id);
});
const { width } = useWindowSize();
</script>

<template>
  <OnyxPageLayout v-bind="props">
    <template #sidebar>
      <!-- using v-show here instead of v-if so the search value is kept when toggling the open state -->
      <!-- we turned off the sidebar collapse since we're using our own floating action button -->
      <OnyxSidebar
        v-show="isOpen || width < ONYX_BREAKPOINTS.sm"
        :temporary="width < ONYX_BREAKPOINTS.sm ? { open: isMobileOpen } : undefined"
        class="sidebar"
        :label="$t('blueprint.sidebar')"
        :collapse-sidebar="false"
        @close="width < ONYX_BREAKPOINTS.sm ? (isMobileOpen = false) : (isOpen = false)"
      >
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

    <template v-if="!!slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
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
