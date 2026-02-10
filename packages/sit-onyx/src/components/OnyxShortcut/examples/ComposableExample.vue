<script lang="ts" setup>
import { _unstableUseShortcut } from "../../../index.js";

_unstableUseShortcut({
  sequence: [{ all: ["Control", "C"] }],
  onComplete: () => {
    alert("Shortcut successfully pressed!");
  },
});
</script>

<template>
  <p class="description">
    This example uses the `_unstableUseShortcut()` composable. Press "Control + C" to trigger the
    shortcut.
  </p>
</template>

<style lang="scss" scoped>
.description {
  font-family: var(--onyx-font-family-paragraph);
  color: var(--onyx-color-text-icons-info-intense);
}
</style>
