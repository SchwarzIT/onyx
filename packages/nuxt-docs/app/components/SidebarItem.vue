<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";

const props = defineProps<{
  item: ContentNavigationItem;
  hasParent?: boolean;
}>();

const localePath = useLocalePath();

const isAccordionOpen = ref(true);
</script>

<template>
  <OnyxSidebarItem
    v-if="!props.item.children"
    class="sidebar-item"
    :link="localePath(props.item.path)"
  >
    {{ props.item.title }}
  </OnyxSidebarItem>

  <OnyxAccordion
    v-else
    :model-value="isAccordionOpen ? [localePath(item.path)] : undefined"
    class="sidebar-accordion"
    :type="props.hasParent ? 'nested-small' : 'nested-large'"
    @update:model-value="isAccordionOpen = !isAccordionOpen"
  >
    <OnyxAccordionItem :value="localePath(item.path)">
      <template #header>{{ props.item.title }}</template>

      <div class="sidebar-item__children">
        <SidebarItem
          v-for="child in item.children"
          :key="localePath(child.path)"
          :item="child"
          has-parent
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

    .sidebar-item {
      margin: 0;
    }
  }
}

.sidebar-accordion {
  > .onyx-accordion-item {
    &:not(.onyx-accordion-item--nested-small) {
      :deep(> .onyx-accordion-item__panel) {
        padding-top: 0;
      }
    }
  }
}
</style>
