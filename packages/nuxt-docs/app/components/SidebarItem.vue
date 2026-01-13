<script lang="ts" setup>
import { iconArrowSmallRight } from "@sit-onyx/icons";
import type { OnyxSidebarItemProps } from "sit-onyx";

export type SidebarItemProps = {
  label: string;
  link: NonNullable<OnyxSidebarItemProps["link"]>;
  icon?: string;
  /**
   * Whether to show an arrow icon indicating that the item link
   * leads to a deeper nested layer in the navigation tree.
   */
  showArrow?: boolean;
};

const props = defineProps<SidebarItemProps>();
</script>

<template>
  <OnyxSidebarItem class="sidebar-item" :link="props.link">
    <ResolvableIcon v-if="props.icon" :name="props.icon" />
    {{ props.label }}
    <OnyxIcon v-if="props.showArrow" :icon="iconArrowSmallRight" />
  </OnyxSidebarItem>
</template>

<style lang="scss" scoped>
.sidebar-item {
  margin: var(--onyx-density-2xs) var(--onyx-density-xs);
}
</style>
