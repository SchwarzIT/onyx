<script lang="ts" setup>
import { computed } from "vue";
import DesignTokenCard from "./DesignTokenCard.vue";

const props = defineProps<{
  name: string;
  large?: boolean;
}>();

const cssVariable = computed(() => `var(--${props.name})`);
</script>

<template>
  <DesignTokenCard :name="props.name">
    <div
      class="radius"
      :class="{ 'radius--large': props.large }"
      :style="{ borderTopRightRadius: cssVariable, borderBottomRightRadius: cssVariable }"
    ></div>
  </DesignTokenCard>
</template>

<style lang="scss" scoped>
.radius {
  width: 4rem;
  height: 4rem;
  border-width: 1px 1px 1px 0;
  border-color: var(--onyx-color-base-warning-500);
  border-style: solid;
  background: var(--onyx-color-base-neutral-100);

  &--large {
    height: 5rem;
  }
}
</style>
