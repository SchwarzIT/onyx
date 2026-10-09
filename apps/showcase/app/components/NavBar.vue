<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import type { OnyxNavItemProps } from "sit-onyx";
import NavBar from "#layers/onyx/app/components/NavBar.vue";
import iconGitHub from "~/assets/images/social/github.svg?raw";

const localePath = useLocalePath();
const route = useRoute();
const { demoAppLink } = useDemoApp();

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
  <NavBar :logo-url app-name="">
    <OnyxNavItem
      :label="$t('documentation')"
      v-bind="getLinkProps('/docs/getting-started/installation')"
    />
    <OnyxNavItem :label="$t('components.component', 2)" v-bind="getLinkProps('/components')" />
    <OnyxNavItem :label="$t('footer.navigation.demo')" :link="demoAppLink" />
    <OnyxNavItem
      :label="$t('footer.navigation.playground')"
      link="https://playground.onyx.schwarz"
    />

    <template #globalContextArea>
      <GlobalSearch />
      <OnyxUnstableNavButton
        label="GitHub"
        :link="{ href: 'https://github.com/SchwarzIT/onyx', target: '_blank' }"
        hide-label
        :icon="iconGitHub"
      />
    </template>

    <template #contextArea>
      <ColorSchemeSwitch v-if="!$colorMode.forced" />
      <OnyxSeparator orientation="vertical" />
      <UserMenu />
    </template>
  </NavBar>
</template>
