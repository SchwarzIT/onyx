<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { isFocusVisible } from "./dom.js";

const buttonRef = useTemplateRef<HTMLButtonElement>("buttonRef");
const isFocused = ref(false);

const updateFocusState = () => {
  if (buttonRef.value) {
    isFocused.value = isFocusVisible(buttonRef.value);
  }
};
</script>

<template>
  <div>
    <button
      ref="buttonRef"
      type="button"
      tabindex="0"
      @focus="updateFocusState"
      @blur="updateFocusState"
    >
      Is focused: {{ isFocused }}
    </button>
  </div>
</template>
