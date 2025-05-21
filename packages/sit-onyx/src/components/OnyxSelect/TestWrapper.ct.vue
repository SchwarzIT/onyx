<script setup lang="ts">
import { ref } from "vue";
import OnyxSelect from "./OnyxSelect.vue";
import type { SelectOption } from "./types";

const options = [
  { value: 1, label: "Default" },
  { value: 2, label: "Selected option" },
  { value: 3, label: "Disabled", disabled: true },
  { value: 4, label: "Very long label ".repeat(5) },
] satisfies SelectOption[];

const modelValue = ref<number>();
</script>

<template>
  <div class="onyx-component">
    <OnyxSelect
      v-model="modelValue"
      :options
      label="Test selection"
      list-label="Test options"
    ></OnyxSelect>
    <button type="button" @click="modelValue = undefined">Unset</button>

    <span data-testid="modelValue">
      {{ modelValue }}
    </span>
  </div>
</template>
