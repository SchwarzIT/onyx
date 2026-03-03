<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { isFocusVisible } from "./dom.js";

const button = useTemplateRef<HTMLButtonElement>("button");
const isFocused = ref(false);

const updateFocusState = () => {
  if (button.value) {
    isFocused.value = isFocusVisible(button.value);
  }
};
</script>

<template>
  <div>
    <button
      ref="button"
      type="button"
      tabindex="0"
      @focus="updateFocusState"
      @blur="updateFocusState"
    >
      Is focused: {{ isFocused }}
    </button>
  </div>
</template>
