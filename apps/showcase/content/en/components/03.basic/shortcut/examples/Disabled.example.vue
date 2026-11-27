<script lang="ts" setup>
import { OnyxShortcut } from "sit-onyx";
</script>

<template>
  <OnyxShortcut :sequence="[{ all: ['Control', 'C'] }]" highlight="auto" disabled />
</template>
