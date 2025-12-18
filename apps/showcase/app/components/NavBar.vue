<script lang="ts" setup>
import NavBar from "#layers/onyx/app/components/NavBar.vue";
const localePath = useLocalePath();
</script>

<template>
  <NavBar logo-url="/onyx-logo.svg">
    <OnyxNavItem :label="$t('home')" :link="localePath('/')" />
    <OnyxNavItem :label="$t('introduction')" :link="localePath('/introduction')" />
    <OnyxNavItem :label="$t('resources')" :link="localePath('/resources')" />
    <OnyxNavItem :label="$t('support')" :link="localePath('/support')" />
  </NavBar>
</template>
