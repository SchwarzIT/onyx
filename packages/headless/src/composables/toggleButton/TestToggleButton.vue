<script lang="ts" setup>
import { ref } from "vue";
import { createToggleButton } from "./createToggleButton.js";

const isPressed = ref(false);
const onToggle = () => (isPressed.value = !isPressed.value);
const {
  elements: { button },
} = createToggleButton({ isPressed, onToggle });
</script>

<template>
  <button type="button" v-bind="button">Mute</button>
</template>

<style scoped>
button[aria-pressed="true"] {
  background: grey;
}
</style>
