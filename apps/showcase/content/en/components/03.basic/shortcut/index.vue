<script lang="ts" setup>
import { OnyxShortcut } from "sit-onyx";
</script>

<template>
  <OnyxShortcut :sequence="[{ all: ['Shift', 'Alt', 'Meta'] }]" os="macOS" />
</template>
