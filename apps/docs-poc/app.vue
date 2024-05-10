<script lang="ts" setup>
import { OnyxAppLayout, OnyxNavItem, OnyxNavigationBar, type OnyxNavItemProps } from "sit-onyx";
import onyxLogo from "~/assets/images/onyx-logo.svg";

const { t } = useI18n();

const navItems = [
  { label: t("home.pageName"), href: "/" },
  { label: t("components.pageName"), href: "/components" },
] satisfies OnyxNavItemProps[];
</script>

<template>
  <OnyxAppLayout>
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
      </OnyxNavigationBar>
    </template>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </OnyxAppLayout>
</template>
