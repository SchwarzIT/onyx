<script lang="ts" setup>
import { OnyxDatePicker } from "sit-onyx";
import { ref } from "vue";

const datetime = ref<string>();
</script>

<template>
  <OnyxDatePicker v-model="datetime" label="Datetime" type="datetime-local" />
</template>
