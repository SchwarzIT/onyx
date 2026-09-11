<script lang="ts" setup>
import { ColorSchemeValue, OnyxButton, OnyxColorSchemeDialog } from "sit-onyx";
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
