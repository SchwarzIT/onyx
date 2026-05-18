<script lang="ts" setup>
import { OnyxInput } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxInput v-model="value" label="Top" />
  <OnyxInput v-model="value" :label="{ label: 'Left', position: 'left' }" />
  <OnyxInput v-model="value" :label="{ label: 'Right', position: 'right' }" />
  <OnyxInput v-model="value" :label="{ label: 'Hidden', hidden: true }" />
</template>
