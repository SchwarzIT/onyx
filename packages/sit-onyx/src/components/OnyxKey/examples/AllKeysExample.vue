<script setup lang="ts">
import OnyxKey from "../OnyxKey.vue";
import {
  ALPHABETIC_KEYS,
  EDITING_KEYS,
  FUNCTION_KEYS,
  MEDIA_KEYS,
  MISC_KEYS,
  MODIFIER_KEYS,
  NAVIGATION_KEYS,
  NUMERIC_KEYS,
  NUMPAD_KEYS,
  SYMBOL_KEYS,
} from "../types.js";

const keys = [
  MISC_KEYS,
  MEDIA_KEYS,
  NUMPAD_KEYS,
  SYMBOL_KEYS,
  EDITING_KEYS,
  NUMERIC_KEYS,
  FUNCTION_KEYS,
  MODIFIER_KEYS,
  ALPHABETIC_KEYS,
  NAVIGATION_KEYS,
].flat();
</script>

<template>
  <div class="container">
    <h2 class="title onyx-text onyx-text--large">Auto variant</h2>
    <div class="raw">
      <OnyxKey v-for="key in keys" :key="key" :key-name="key" />
    </div>

    <h2 class="title onyx-text onyx-text--large">macOS variant</h2>
    <div class="raw">
      <OnyxKey v-for="key in keys" :key="key" :key-name="key" variant="macOS" />
    </div>

    <h2 class="title onyx-text onyx-text--large">Windows variant</h2>
    <div class="raw">
      <OnyxKey v-for="key in keys" :key="key" :key-name="key" variant="windows" />
    </div>

    <h2 class="title onyx-text onyx-text--large">Generic variant</h2>
    <div class="raw">
      <OnyxKey v-for="key in keys" :key="key" :key-name="key" variant="generic" />
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.raw {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.title {
  color: var(--onyx-color-text-icons-neutral-medium);
}
</style>
