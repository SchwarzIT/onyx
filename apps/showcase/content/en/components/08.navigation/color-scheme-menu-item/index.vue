<script lang="ts" setup>
import { OnyxColorSchemeMenuItem, type ColorSchemeValue } from "sit-onyx";
import { ref } from "vue";

const colorScheme = ref<ColorSchemeValue>("auto");
</script>

<template>
  <OnyxColorSchemeMenuItem v-model="colorScheme" />
</template>
