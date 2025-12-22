<script lang="ts" setup>
import type { SidebarNavigationItem } from "../composables/useSidebarNavigation.js";

const props = defineProps<{
  item: SidebarNavigationItem;
}>();

const isAccordionOpen = ref(true);
watch(
  () => props.item.sidebar?.collapsed,
  (collapsed) => {
    isAccordionOpen.value = !collapsed;
  },
  { immediate: true },
);
</script>

<template>
  <OnyxSidebarItem v-if="!props.item.children?.length" class="sidebar-item" :link="props.item.path">
    {{ props.item.title }}
  </OnyxSidebarItem>

  <OnyxAccordion
    v-else
    :model-value="isAccordionOpen ? [props.item.path] : undefined"
    class="sidebar-accordion"
    type="nested-large"
    @update:model-value="isAccordionOpen = !isAccordionOpen"
  >
    <OnyxAccordionItem :value="props.item.path">
      <template #header>{{ props.item.title }}</template>

      <div class="sidebar-item__children">
        <OnyxSidebarItem v-for="child in props.item.children" :key="child.path" :link="child.path">
          {{ child.title }}
        </OnyxSidebarItem>
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
}
</style>
