<script lang="ts" setup>
defineSlots<{
  /**
   * One or multiple OnyxCodeGroupTab components.
   */
  default(): unknown;
}>();

const activeTab = ref("");
</script>

<template>
  <OnyxTabs v-model="activeTab" class="onyx-code-group" label="Code snippet" density="compact">
    <slot></slot>
  </OnyxTabs>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-code-group {
  @include layers.component() {
    --onyx-code-group-border: var(--onyx-1px-in-rem) solid
      var(--onyx-color-component-border-neutral);
    --onyx-tabs-tablist-margin-bottom: 0;
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-code-group-border);

    .onyx-tabs {
      &__tablist {
        background-color: var(--onyx-color-base-background-blank);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        padding: var(--onyx-density-2xs);
        border-bottom: var(--onyx-code-group-border);
      }
    }
  }
}
</style>
