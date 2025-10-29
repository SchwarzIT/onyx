<script lang="ts" setup>
import type { OnyxCodeGroupTabProps } from "./types.js";

defineOptions({ inheritAttrs: false });

const props = defineProps<OnyxCodeGroupTabProps>();

defineSlots<{
  /**
   * Formatted / highlighted code snippet.
   */
  default(): unknown;
}>();

const attrs = useAttrs();
</script>

<template>
  <OnyxTab class="onyx-code-group-tab" :value="props.label">
    <template #tab>
      <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
      {{ props.label }}
    </template>

    <pre class="onyx-code-group-tab__snippet" v-bind="attrs"><slot /></pre>
  </OnyxTab>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-code-group-tab {
  @include layers.component() {
    font-size: var(--onyx-font-size-md);
    line-height: var(--onyx-font-line-height-md);

    &__snippet {
      padding: var(--onyx-density-md);
      background: var(--onyx-color-base-background-tinted);
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;

      font-family: var(--onyx-font-family-mono);
      white-space: pre-wrap;
    }
  }
}
</style>
