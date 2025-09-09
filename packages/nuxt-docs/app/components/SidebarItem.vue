<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";

const props = defineProps<{
  item: ContentNavigationItem;
}>();

const localePath = useLocalePath();

const isAccordionOpen = ref(true);

const children = computed(() => {
  // filter out children that are directories
  return props.item.children?.filter((child) => child.page !== false);
});
</script>

<template>
  <OnyxSidebarItem v-if="!children" class="sidebar-item" :link="localePath(props.item.path)">
    {{ props.item.title }}
  </OnyxSidebarItem>

  <OnyxAccordion
    v-else
    :model-value="isAccordionOpen ? [localePath(item.path)] : undefined"
    class="sidebar-accordion"
    type="nested-large"
    @update:model-value="isAccordionOpen = !isAccordionOpen"
  >
    <OnyxAccordionItem :value="localePath(item.path)">
      <template #header>{{ props.item.title }}</template>

      <div class="sidebar-item__children">
        <OnyxSidebarItem
          v-for="child in children"
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
