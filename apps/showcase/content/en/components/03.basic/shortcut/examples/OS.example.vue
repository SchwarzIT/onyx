<script lang="ts" setup>
import { OnyxUnstableShortcut, ShortcutSequenceStep } from "sit-onyx";

const sequence: ShortcutSequenceStep[] = [{ all: ["Meta"] }];

const handleComplete = () => {
  // your logic here when the full shortcut is pressed...
};
</script>

<template>
  <div class="shortcut">
    <OnyxUnstableShortcut :sequence @complete="handleComplete" />
    Auto
  </div>

  <div class="shortcut">
    <OnyxUnstableShortcut :sequence os="macOS" @complete="handleComplete" />
    macOS
  </div>

  <div class="shortcut">
    <OnyxUnstableShortcut :sequence os="windows" @complete="handleComplete" />
    Windows
  </div>

  <div class="shortcut">
    <OnyxUnstableShortcut :sequence os="generic" @complete="handleComplete" />
    Generic
  </div>
</template>

<style lang="scss" scoped>
.shortcut {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
}
</style>
