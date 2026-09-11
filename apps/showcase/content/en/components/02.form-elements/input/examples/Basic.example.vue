<script lang="ts" setup>
import { OnyxInput } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxInput v-model="value" label="Example label" placeholder="Placeholder..." required />
</template>
