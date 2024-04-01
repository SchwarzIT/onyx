<script lang="ts" setup>
import { OnyxHeadline, OnyxInput } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxHeadline is="h1">Welcome</OnyxHeadline>
  <OnyxInput v-model="value" label="Example input" />
</template>
