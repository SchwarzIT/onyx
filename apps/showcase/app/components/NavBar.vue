<script lang="ts" setup>
import NavBar from "#layers/onyx/app/components/NavBar.vue";
import type { OnyxNavItemProps } from "sit-onyx";

const localePath = useLocalePath();
const route = useRoute();

const getLinkProps = computed(() => {
  return (link: string) => {
    link = localePath(link);

    return {
      link,
      active: route.path.startsWith(link),
    } satisfies Partial<OnyxNavItemProps>;
  };
});
</script>

<template>
  <NavBar logo-url="/onyx-logo.svg">
    <OnyxNavItem :label="$t('home')" :link="localePath('/')" />
    <OnyxNavItem :label="$t('introduction')" v-bind="getLinkProps('/introduction')" />
    <OnyxNavItem :label="$t('resources')" v-bind="getLinkProps('/resources')" />
    <OnyxNavItem :label="$t('support')" v-bind="getLinkProps('/support')" />

    <template #contextArea>
      <ColorSchemeSwitch />
      <OnyxSeparator orientation="vertical" />
      <UserMenu />
    </template>
  </NavBar>
</template>
