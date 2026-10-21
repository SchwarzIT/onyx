<script lang="ts" setup>
import { OnyxUnstableShortcut } from "sit-onyx";
</script>

<template>
  <OnyxUnstableShortcut :sequence="[{ all: ['Shift', 'Alt', 'Meta'] }]" />
</template>
