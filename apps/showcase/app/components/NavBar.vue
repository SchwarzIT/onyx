<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import { iconMessageConversation } from "@sit-onyx/icons";
import type { OnyxNavItemProps, OnyxUnstableNavButton } from "sit-onyx";
import NavBar from "#layers/onyx/app/components/NavBar.vue";
import iconGitHub from "~/assets/images/social/github.svg?raw";

const localePath = useLocalePath();
const route = useRoute();
const { demoAppLink } = useDemoApp();
const { loggedIn } = useUserSession();

const getLinkProps = computed(() => {
  return (link: string, base?: string) => {
    link = localePath(link);

    return {
      link,
      active: route.path.startsWith(base ?? link),
    } satisfies Partial<OnyxNavItemProps>;
  };
});
</script>

<template>
  <NavBar :logo-url app-name="">
    <OnyxNavItem
      :label="$t('documentation')"
      v-bind="getLinkProps('/docs/getting-started/installation', '/docs')"
    />
    <OnyxNavItem :label="$t('components.component', 2)" v-bind="getLinkProps('/components')" />
    <OnyxNavItem :label="$t('icons.icon', 2)" link="/components/basic/icon#available-icons" />
    <OnyxNavItem :label="$t('footer.navigation.demo')" :link="demoAppLink" />
    <OnyxNavItem
      :label="$t('footer.navigation.playground')"
      link="https://playground.onyx.schwarz"
    />

    <template #globalContextArea>
      <OnyxFlyoutMenu label="Contact options">
        <template #button="{ trigger }">
          <OnyxUnstableNavButton
            label="Contact"
            :icon="iconMessageConversation"
            hide-label
            v-bind="trigger"
          />
        </template>

        <template #options>
          <OnyxMenuItem
            label="Report bug"
            link="https://github.com/SchwarzIT/onyx/issues/new?template=01-bug_report.yml"
          />
          <OnyxMenuItem
            label="Request feature"
            link="https://github.com/SchwarzIT/onyx/discussions/new/choose"
          />
          <OnyxMenuItem
            v-if="loggedIn"
            label="Join Google Community"
            link="https://groups.google.com/a/gws.schwarz/g/onyx-community/about"
          />
        </template>
      </OnyxFlyoutMenu>

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
