<script lang="ts" setup>
import NavBar from "#layers/blueprint/app/components/NavBar.vue";
import logoUrl from "~/assets/images/onyx-logo.svg";

const localePath = useLocalePath();
</script>

<template>
  <NavBar app-name="onyx demo" :logo-url>
    <OnyxNavItem :label="$t('home')" :link="localePath('/')" />

    <template #contextArea>
      <ColorSchemeSwitch />
      <DensitySwitch />
      <LocaleSwitch />

      <OnyxSeparator orientation="vertical" />

      <UserMenu />
    </template>
  </NavBar>
</template>
