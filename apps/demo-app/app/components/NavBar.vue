<script lang="ts" setup>
import NavBar from "#layers/blueprint/app/components/NavBar.vue";
import logoUrl from "~/assets/images/onyx-logo.svg";

const localePath = useLocalePath();
</script>

<template>
  <NavBar app-name="onyx demo" :logo-url>
    <OnyxNavItem :label="$t('overview')" :link="localePath('/')" />
    <OnyxNavItem :label="$t('dataGrid.pageName')" :link="localePath('/data-grid')" />
    <OnyxNavItem :label="$t('forms')" :link="localePath('/forms')" />
    <OnyxNavItem :label="$t('charts.pageName')" :link="localePath('/charts')" />

    <template #contextArea>
      <ColorSchemeSwitch />
      <DensitySwitch />
      <LocaleSwitch />

      <OnyxSeparator orientation="vertical" />

      <UserMenu />
    </template>
  </NavBar>
</template>
