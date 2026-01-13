<script lang="ts" setup>
import type { SidebarNavigationItem } from "../composables/useSidebarNavigation.js";
import type { SidebarItemProps } from "./SidebarItem.vue";

const props = defineProps<{
  item: SidebarNavigationItem;
}>();

const route = useRoute();

const isAccordionOpen = ref(true);
watch(
  () => props.item.sidebar?.collapsed,
  (collapsed) => {
    isAccordionOpen.value = !collapsed;
  },
  { immediate: true },
);

const isChildActive = computed(() => {
  const isActive = (item: SidebarNavigationItem): boolean => {
    if (item.path === route.path) return true;
    return item.children?.some(isActive) ?? false;
  };

  // ensure accordion is open if any child route is currently active
  return props.item.children?.some(isActive) ?? false;
});

watch(
  isChildActive,
  (isActive) => {
    // ensure accordion is open if any child route is currently active
    // e.g. when reloading the page or navigating via global search
    if (isActive) isAccordionOpen.value = true;
  },
  { immediate: true },
);

const getSidebarItemProps = (item: SidebarNavigationItem): SidebarItemProps => {
  return {
    label: item.title,
    link: item.path,
    icon: item.icon,
    showArrow: item.sidebar?.root,
  };
};
</script>

<template>
  <SidebarItem
    v-if="!props.item.children?.length"
    class="sidebar-item"
    v-bind="getSidebarItemProps(props.item)"
  />

  <OnyxAccordion
    v-else
    :model-value="isAccordionOpen ? [props.item.path] : undefined"
    class="sidebar-accordion"
    type="nested-large"
    @update:model-value="isAccordionOpen = !isAccordionOpen"
  >
    <OnyxAccordionItem :value="props.item.path">
      <template #header>
        <div class="sidebar-accordion__header">
          <ResolvableIcon v-if="props.item.icon" :name="props.item.icon" />
          {{ props.item.title }}
        </div>
      </template>

      <div class="sidebar-item__children">
        <!--
          When the accordion is used (so the item has children), it does not show the item arrow in the accordion itself.
          So for the child item, the arrow should also be shown if the parent should show it.
        -->
        <SidebarItem
          v-for="child in props.item.children"
          :key="child.path"
          v-bind="getSidebarItemProps(child)"
          :show-arrow="
            getSidebarItemProps(child).showArrow || getSidebarItemProps(props.item).showArrow
          "
        />
      </div>
    </OnyxAccordionItem>
  </OnyxAccordion>
</template>

<style lang="scss" scoped>
.sidebar-item {
  margin: var(--onyx-density-2xs) var(--onyx-density-xs);

  &:first-of-type {
    margin-top: var(--onyx-density-xs);
  }

  &__children {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}

.sidebar-accordion {
  > .onyx-accordion-item {
    :deep(> .onyx-accordion-item__panel) {
      padding-top: 0;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-2xs);
  }
}
</style>
