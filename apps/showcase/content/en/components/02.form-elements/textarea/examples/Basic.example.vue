<script lang="ts" setup>
import { OnyxTextarea } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxTextarea v-model="value" label="Example label" placeholder="Placeholder..." required />
</template>
