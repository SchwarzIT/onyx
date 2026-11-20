<script lang="ts" setup>
import { OnyxShortcut } from "sit-onyx";

const handleComplete = () => {
  // your logic here when the full shortcut is pressed...
};
</script>

<template>
  <OnyxShortcut
    :sequence="[{ all: ['Control', 'K', { any: ['A', 'B'] }] }]"
    highlight="auto"
    @complete="handleComplete"
  />
</template>
