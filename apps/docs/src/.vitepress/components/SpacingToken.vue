<script lang="ts" setup>
import { computed } from "vue";
import DesignTokenCard from "./DesignTokenCard.vue";

const props = defineProps<{
  name: string;
}>();

const cssVariable = computed(() => `var(--${props.name})`);
</script>

<template>
  <DesignTokenCard :name="props.name">
    <figure class="spacing">
      <figure class="spacing__area" :style="{ height: cssVariable }"></figure>
    </figure>
  </DesignTokenCard>
</template>

<style lang="scss" scoped>
.spacing {
  width: 4rem;
  min-height: 4rem;
  border-radius: var(--onyx-radius-sm);
  border: 1px solid var(--onyx-color-base-border-default);
  background: var(--onyx-color-base-neutral-100);
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__area {
    border-top: 1px solid var(--onyx-color-base-warning-500);
    border-bottom: 1px solid var(--onyx-color-base-warning-500);
    background: var(--onyx-color-base-warning-200);
    width: 100%;

    margin: var(--onyx-spacing-xs) 0;
  }
}
</style>
