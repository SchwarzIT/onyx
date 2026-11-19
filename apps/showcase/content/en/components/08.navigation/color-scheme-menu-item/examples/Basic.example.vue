<script lang="ts" setup>
import { OnyxColorSchemeMenuItem, OnyxUserMenu, type ColorSchemeValue } from "sit-onyx";
import { ref } from "vue";

const colorScheme = ref<ColorSchemeValue>("auto");
</script>

<template>
  <OnyxUserMenu full-name="Jane Doe">
    <OnyxColorSchemeMenuItem v-model="colorScheme" />
  </OnyxUserMenu>
</template>
