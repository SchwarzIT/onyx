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

const slots = defineSlots<{
  /**
   * Additional trailing content to display on the right.
   */
  trailing?(): unknown;
}>();

const { icon } = useIcon(computed(() => props.icon));
</script>

<template>
  <OnyxSidebarItem class="sidebar-item" :link="props.link">
    <div class="sidebar-item__content">
      <OnyxIcon v-if="icon" :icon />
      {{ props.label }}
      <OnyxIcon v-if="props.showArrow" :icon="iconArrowSmallRight" />
    </div>

    <div v-if="slots.trailing" class="sidebar-item__trailing onyx-density-compact">
      <slot name="trailing"></slot>
    </div>
  </OnyxSidebarItem>
</template>

<style lang="scss" scoped>
.sidebar-item {
  margin: var(--onyx-density-2xs) var(--onyx-density-xs);
  flex-wrap: wrap;
  justify-content: space-between;

  &__content {
    display: flex;
    align-items: inherit;
    gap: inherit;
  }

  &__trailing {
    display: flex;
    align-items: inherit;
    gap: inherit;
    flex-wrap: wrap;
  }
}
</style>
