<script lang="ts" setup>
import NavBar from "#layers/blueprint/app/components/NavBar.vue";

const localePath = useLocalePath();
</script>

<template>
  <NavBar app-name="onyx demo">
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
