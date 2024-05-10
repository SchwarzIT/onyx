<script lang="ts" setup>
import {
  OnyxAppLayout,
  OnyxIconButton,
  OnyxNavItem,
  OnyxNavigationBar,
  OnyxSwitch,
  type OnyxNavItemProps,
} from "sit-onyx";
import githubLogo from "~/assets/images/github-logo.svg?raw";
import onyxLogo from "~/assets/images/onyx-logo.svg";

const { t } = useI18n();

const navItems = [
  { label: t("home.pageName"), href: "/" },
  { label: t("components.pageName"), href: "/components" },
] satisfies OnyxNavItemProps[];
</script>

<template>
  <OnyxAppLayout class="onyx-grid-max-lg">
    <template #navBar>
      <OnyxNavigationBar
        :app-name="$t('appName')"
        :logo-url="onyxLogo"
        show-back-button
        @back-button-click="$router.back"
        @app-area-click="$router.push('/')"
      >
        <OnyxNavItem
          v-for="item in navItems"
          :key="item.href"
          v-bind="item"
          :active="item.href === $route.path"
          @navigate="$router.push"
        />

        <template #contextArea>
          <ClientOnly>
            <OnyxSwitch
              class="theme-toggle"
              :label="$t('nav.darkMode')"
              :model-value="$colorMode.value === 'dark'"
              @update:model-value="$colorMode.preference = $event ? 'dark' : 'light'"
            />
          </ClientOnly>

          <a
            href="https://github.com/SchwarzIT/onyx"
            target="_blank"
            :aria-label="$t('nav.github')"
          >
            <OnyxIconButton
              :label="$t('nav.github')"
              :icon="githubLogo"
              variation="secondary"
            />
          </a>
        </template>
      </OnyxNavigationBar>
    </template>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.theme-toggle {
  margin-right: var(--onyx-spacing-sm);
}
</style>
