<script lang="ts" setup>
import { OnyxUnstableShortcut } from "sit-onyx";
</script>

<template>
  <OnyxUnstableShortcut :sequence="[{ all: ['Control', 'C'] }]" skeleton />
</template>
