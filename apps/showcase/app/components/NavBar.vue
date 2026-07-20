<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import type { OnyxNavItemProps } from "sit-onyx";
import NavBar from "#layers/onyx/app/components/NavBar.vue";

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
  <NavBar :logo-url>
    <OnyxNavItem
      :label="$t('introduction')"
      v-bind="getLinkProps('/introduction/getting-started/installation')"
    />
    <OnyxNavItem :label="$t('components.component', 2)" v-bind="getLinkProps('/components')" />
    <OnyxNavItem :label="$t('resources')" v-bind="getLinkProps('/resources')" />
    <OnyxNavItem :label="$t('support')" v-bind="getLinkProps('/support')" />

    <template #contextArea>
      <ColorSchemeSwitch v-if="!$colorMode.forced" />
      <OnyxSeparator orientation="vertical" />
      <UserMenu />
    </template>
  </NavBar>
</template>
