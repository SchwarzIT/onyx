<script lang="ts" setup>
import type { OnyxInfoCardProps } from "sit-onyx";

const props = defineProps<OnyxInfoCardProps>();

const slots = defineSlots<{
  default?(): unknown;
}>();
</script>

<template>
  <OnyxInfoCard class="card" v-bind="props">
    <template v-if="slots.default" #default>
      <slot mdc-unwrap="p"></slot>
    </template>
  </OnyxInfoCard>
</template>

<style lang="scss" scoped>
.card {
  margin-block: var(--onyx-docs-density-paragraph);
}
</style>
