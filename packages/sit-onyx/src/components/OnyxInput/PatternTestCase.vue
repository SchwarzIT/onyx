<script lang="ts" setup>
import { ref } from "vue";
import OnyxInput from "./OnyxInput.vue";
const value = ref("");
</script>

<template>
  <OnyxInput
    v-model="value"
    label="Test label"
    :pattern="{ value: '^[a-z]+$', error: 'Only letters are allowed' }"
  />
</template>
