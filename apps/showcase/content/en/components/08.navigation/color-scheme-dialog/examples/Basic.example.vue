<script lang="ts" setup>
import { OnyxButton, OnyxColorSchemeDialog, type ColorSchemeValue } from "sit-onyx";
import { ref } from "vue";

const colorScheme = ref<ColorSchemeValue>("auto");
const open = ref(false);
</script>

<template>
  <div>
    <OnyxButton label="Show dialog" @click="open = true" />
    <OnyxColorSchemeDialog v-model="colorScheme" v-model:open="open" />
  </div>
</template>
