<script lang="ts" setup>
import { useShortcut, useToast } from "sit-onyx";

const toast = useToast();

useShortcut({
  sequence: [{ all: ["Shift", "7"] }],
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
  <p class="description">Press (Shift + 7) to trigger the shortcut.</p>
</template>

<style scoped>
.description {
  color: var(--onyx-color-text-icons-info-intense);
}
</style>
