<script lang="ts" setup>
import { extractLinkProps } from "sit-onyx";
import type { NavItem } from "../app.config";

const props = defineProps<NavItem>();

const localePath = useLocalePath();

/**
 * Same as `props` but without the `children` property to prevent console warnings when using `v-bind`.
 */
const navItemProps = computed(() => {
  const { children: _, ...rest } = props;
  return rest;
});

/**
 * Nav item link depending on the current locale / i18n.
 */
const localeLink = computed(() => {
  if (!props.link) return;
  const _link = extractLinkProps(props.link);
  return { ..._link, href: localePath(_link.href) };
});
</script>

<template>
  <OnyxNavItem v-bind="navItemProps" :link="localeLink">
    <template v-if="props.children?.length" #children>
      <NavItem v-for="child in props.children" :key="child.label" v-bind="child" />
    </template>
  </OnyxNavItem>
</template>
