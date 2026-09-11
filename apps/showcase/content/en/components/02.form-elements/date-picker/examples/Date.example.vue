<script lang="ts" setup>
import { OnyxDatePicker } from "sit-onyx";
import { ref } from "vue";

const date = ref<string>();
</script>

<template>
  <OnyxDatePicker v-model="date" label="Date" />
</template>
