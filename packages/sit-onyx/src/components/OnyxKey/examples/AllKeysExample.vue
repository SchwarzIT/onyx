<script setup lang="ts">
import { computed, ref, type ComponentInstance } from "vue";
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
  OnyxHeadline,
  OnyxUnstableKey,
  SYMBOL_KEYS,
} from "../../../index.js";

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

const detectedKey = ref<ComponentInstance<typeof OnyxUnstableKey>>();
const detectedOS = computed(() => detectedKey.value?.actualOS);
</script>

<template>
  <div class="container">
    <section>
      <OnyxHeadline is="h2">Auto detected OS ({{ detectedOS }})</OnyxHeadline>
      <div class="container__keys">
        <OnyxUnstableKey
          v-for="key in keys"
          :key="key"
          :ref="(el) => (detectedKey = el as typeof detectedKey)"
          :key-name="key"
        />
      </div>
    </section>

    <section>
      <OnyxHeadline is="h2">macOS</OnyxHeadline>
      <div class="container__keys">
        <OnyxUnstableKey v-for="key in keys" :key="key" :key-name="key" os="macOS" />
      </div>
    </section>

    <section>
      <OnyxHeadline is="h2">Windows</OnyxHeadline>
      <div class="container__keys">
        <OnyxUnstableKey v-for="key in keys" :key="key" :key-name="key" os="windows" />
      </div>
    </section>

    <section>
      <OnyxHeadline is="h2">Generic</OnyxHeadline>
      <div class="container__keys">
        <OnyxUnstableKey v-for="key in keys" :key="key" :key-name="key" os="generic" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);

  &__keys {
    display: flex;
    flex-wrap: wrap;
    gap: var(--onyx-density-xs);
    margin-top: var(--onyx-density-xs);
  }
}
</style>
