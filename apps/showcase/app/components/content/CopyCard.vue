<script lang="ts" setup>
import { iconCheckSmall, iconCopy } from "@sit-onyx/icons";
import { useClipboard } from "@vueuse/core";

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

const { copy, copied } = useClipboard({ source: toRef(props, "value") });
</script>

<template>
  <OnyxCard class="copy">
    <slot mdc-unwrap="p"></slot>

    <OnyxIcon v-if="copied" :icon="iconCheckSmall" color="success" />
    <OnyxSystemButton v-else :label="$t('copyToClipboard')" :icon="iconCopy" @click="copy()" />
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
