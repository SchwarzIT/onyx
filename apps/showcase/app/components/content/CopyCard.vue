<script lang="ts" setup>
const props = defineProps<{
  /**
   * Value to copy.
   */
  value: string;
}>();

defineSlots<{
  /**
   * Content / value to display. Is needed in addition to `value` property so its searchable via Nuxt content global search.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="copy">
    <slot mdc-unwrap="p"></slot>
    <CopyButton :value="props.value" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.copy {
  flex-direction: row;
  justify-content: space-between;

  color: var(--onyx-color-text-icons-neutral-medium);
  font-family: var(--onyx-font-family-h3);
  font-size: var(--onyx-font-size-md);
  font-weight: var(--onyx-font-weight-semibold);
  line-height: var(--onyx-font-line-height-md);
}
</style>
