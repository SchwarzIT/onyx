<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();
const options = [] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect v-model="value" label="Top" list-label="Available options" :options />
  <OnyxSelect
    v-model="value"
    :label="{ label: 'Left', position: 'left' }"
    list-label="Available options"
    :options
  />
  <OnyxSelect
    v-model="value"
    :label="{ label: 'Right', position: 'right' }"
    list-label="Available options"
    :options
  />
  <OnyxSelect
    v-model="value"
    :label="{ label: 'Hidden', hidden: true }"
    list-label="Available options"
    :options
  />
</template>
