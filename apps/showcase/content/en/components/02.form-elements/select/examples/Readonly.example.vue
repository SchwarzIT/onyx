<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
] satisfies SelectOption[];

const value = ref<string>(options[0].value);
</script>

<template>
  <OnyxSelect v-model="value" label="Readonly" list-label="Available options" :options readonly />
  <OnyxSelect v-model="value" label="Disabled" list-label="Available options" :options disabled />
</template>
