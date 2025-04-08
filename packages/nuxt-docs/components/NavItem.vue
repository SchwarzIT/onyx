<script lang="ts" setup>
import type { NavItem } from "../app.config";

const props = defineProps<NavItem>();

/**
 * Same as `props` but without the `children` property to prevent console warnings when using `v-bind`.
 */
const navItemProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props;
  return rest;
});
</script>

<template>
  <OnyxNavItem v-bind="navItemProps">
    <template v-if="props.children?.length" #children>
      <NavItem v-for="child in props.children" :key="child.label" v-bind="child" />
    </template>
  </OnyxNavItem>
</template>
