<script lang="ts" setup>
import type { OnyxInfoCardProps } from "sit-onyx";

const props = withDefaults(defineProps<OnyxInfoCardProps>(), {
  icon: undefined, // using "undefined" so it does not default to "false" so the correct default icon is used by the OnyxInfoCard
});

const slots = defineSlots<{
  default?(): unknown;
}>();

const { icon: iconContent } = useIcon(
  computed(() => (typeof props.icon === "string" ? props.icon : undefined)),
);
</script>

<template>
  <OnyxInfoCard class="card" v-bind="props" :icon="iconContent ?? props.icon">
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
