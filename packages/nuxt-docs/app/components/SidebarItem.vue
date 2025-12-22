<script lang="ts" setup>
import type { SidebarNavigationItem } from "../composables/useSidebarNavigation.js";

const props = defineProps<{
  item: SidebarNavigationItem;
}>();

const localePath = useLocalePath();
const path = computed(() => localePath(props.item.path));

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
  <OnyxSidebarItem v-if="!props.item.children?.length" class="sidebar-item" :link="path">
    {{ props.item.title }}
  </OnyxSidebarItem>

  <OnyxAccordion
    v-else
    :model-value="isAccordionOpen ? [path] : undefined"
    class="sidebar-accordion"
    type="nested-large"
    @update:model-value="isAccordionOpen = !isAccordionOpen"
  >
    <OnyxAccordionItem :value="path">
      <template #header>{{ props.item.title }}</template>

      <div class="sidebar-item__children">
        <OnyxSidebarItem
          v-for="child in props.item.children"
          :key="localePath(child.path)"
          :link="localePath(child.path)"
        >
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
