<script lang="ts" setup>
import { OnyxTextarea } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxTextarea v-model="value" label="Top" />
  <OnyxTextarea v-model="value" :label="{ label: 'Left', position: 'left' }" />
  <OnyxTextarea v-model="value" :label="{ label: 'Right', position: 'right' }" />
  <OnyxTextarea v-model="value" :label="{ label: 'Hidden', hidden: true }" />
</template>
