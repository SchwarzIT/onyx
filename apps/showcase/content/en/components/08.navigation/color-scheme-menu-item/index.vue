<script lang="ts" setup>
import { ColorSchemeValue, OnyxColorSchemeMenuItem } from "sit-onyx";
import { ref } from "vue";

const colorScheme = ref<ColorSchemeValue>("auto");
</script>

<template>
  <OnyxColorSchemeMenuItem v-model="colorScheme" />
</template>
