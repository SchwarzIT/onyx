<script lang="ts" setup>
import NavBar from "#layers/blueprint/app/components/NavBar.vue";
import type { OnyxNavBarSlots } from "sit-onyx";
import logoUrl from "~/assets/images/onyx-logo.svg";

defineSlots<Pick<OnyxNavBarSlots, "contextArea">>();

const localePath = useLocalePath();
</script>

<template>
  <NavBar app-name="onyx demo" :logo-url>
    <OnyxNavItem :label="$t('overview')" :link="localePath('/')" />
    <OnyxNavItem :label="$t('dataGrid.pageName')" :link="localePath('/data-grid')" />
    <OnyxNavItem :label="$t('forms')" :link="localePath('/forms')" />
    <OnyxNavItem :label="$t('charts')" :link="localePath('/charts')" />

    <template #contextArea>
      <!-- eslint-disable-next-line vue/require-explicit-slots -- slots type is imported from onyx but eslint does not seem to be able to handle this -->
      <slot name="contextArea"></slot>

      <ColorSchemeSwitch />
      <DensitySwitch />
      <LocaleSwitch />

      <OnyxSeparator orientation="vertical" />

      <UserMenu />
    </template>
  </NavBar>
</template>
