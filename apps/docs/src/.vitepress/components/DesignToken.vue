<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  name: string;
  isCopied?: boolean;
}>();

const cssVariable = computed(() => `var(--${props.name})`);
</script>

<template>
  <div class="token" :class="{ 'token--copied': props.isCopied }">
    <span class="token__name">{{ props.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.token {
  &__name {
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-xs) var(--onyx-spacing-2xs)
      var(--onyx-spacing-sm);
    border-radius: var(--onyx-radius-sm);
    border: 1px solid var(--onyx-color-base-neutral-200);
    font-family: var(--onyx-font-family-mono);
    width: max-content;
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-lg);

    &::after {
      content: "";
      width: 1.25rem;
      height: 1.25rem;
      background-color: v-bind("cssVariable");
      border-radius: var(--onyx-radius-sm);
    }
  }

  &--copied {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-sm);

    &::after {
      content: "Copied ✓";
      display: inline-flex;
      color: var(--onyx-color-text-success-intense);
      font-size: 0.8125rem;
    }
  }
}
</style>
