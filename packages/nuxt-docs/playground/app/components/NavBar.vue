<script lang="ts" setup>
import NavBar from "#layers/onyx/app/components/NavBar.vue";

const localePath = useLocalePath();
</script>

<template>
  <NavBar>
    <OnyxNavItem label="Home" :link="localePath('/')" />
    <OnyxNavItem label="Foo" :link="localePath('/foo')" />
    <OnyxNavItem label="Does not exist" :link="localePath('/does-not-exist')" />
  </NavBar>
</template>
