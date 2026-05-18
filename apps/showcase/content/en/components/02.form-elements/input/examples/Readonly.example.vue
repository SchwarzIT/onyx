<script lang="ts" setup>
import { OnyxInput } from "sit-onyx";
import { ref } from "vue";

const value = ref("Example value");
</script>

<template>
  <OnyxInput v-model="value" label="Readonly" readonly />
  <OnyxInput v-model="value" label="Disabled" disabled />
</template>
