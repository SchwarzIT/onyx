<script lang="ts" setup>
import { OnyxTextarea } from "sit-onyx";
import { ref } from "vue";

const value = ref("Example value");
</script>

<template>
  <OnyxTextarea v-model="value" label="Readonly" readonly />
  <OnyxTextarea v-model="value" label="Disabled" disabled />
</template>
