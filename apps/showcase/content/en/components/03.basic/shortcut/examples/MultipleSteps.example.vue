<script lang="ts" setup>
import { OnyxUnstableShortcut } from "sit-onyx";

const handleComplete = () => {
  // your logic here when the full shortcut is pressed...
};
</script>

<template>
  <OnyxUnstableShortcut
    :sequence="[{ all: ['Control', 'K'] }, { any: ['A', 'B'] }]"
    highlight="auto"
    @complete="handleComplete"
  />
</template>
