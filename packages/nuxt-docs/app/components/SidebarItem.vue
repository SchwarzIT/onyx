<script lang="ts" setup>
import { iconArrowSmallRight } from "@sit-onyx/icons";
import type { SidebarNavigationItem } from "../composables/useSidebarNavigation.js";

const props = defineProps<{
  item: Omit<SidebarNavigationItem, "children">;
}>();
</script>

<template>
  <OnyxSidebarItem class="sidebar-item" :link="props.item.path">
    <ResolvableIcon v-if="props.item.icon" :name="props.item.icon" />
    {{ props.item.title }}
    <OnyxIcon v-if="props.item.sidebar?.root" :icon="iconArrowSmallRight" />
  </OnyxSidebarItem>
</template>

<style lang="scss" scoped>
.sidebar-item {
  margin: var(--onyx-density-2xs) var(--onyx-density-xs);
}
</style>
