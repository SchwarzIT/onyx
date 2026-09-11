<script lang="ts" setup>
import { _unstableUseShortcut, useToast } from "../../../index.js";

const toast = useToast();

_unstableUseShortcut({
  sequence: [{ all: ["Control", "C"] }],
  onComplete: () => {
    // your logic here when the full shortcut is pressed...
    toast.show({
      headline: "Successfully pressed shortcut",
      description: "This shortcut was triggered using the shortcut composable",
      color: "success",
    });
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
