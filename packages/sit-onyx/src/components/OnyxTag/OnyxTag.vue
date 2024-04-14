<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "primary",
});
</script>

<template>
  <label class="onyx-tag" :class="[`onyx-tag--${props.color}`]" for="onyx-tag">
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-tag__label onyx-truncation-ellipsis">{{ props.label }}</span>
  </label>
</template>

<style lang="scss">
.onyx-tag {
  --onyx-tag-text-color: var(--onyx-color-text-icons-primary-intense);

  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: var(--onyx-tag-text-color);
  font-family: var(--onyx-font-family);

  &--primary {
  }
  &--secondary {
    --onyx-tag-text-color: var(--onyx-color-text-icons-neutral-intense);
  }
  &--danger {
    --onyx-tag-text-color: var(--onyx-color-text-icons-danger-intense);
  }
  &--warning {
    --onyx-tag-text-color: var(--onyx-color-text-icons-warning-intense);
  }
  &--success {
    --onyx-tag-text-color: var(--onyx-color-text-icons-success-intense);
  }
  &--info {
    --onyx-tag-text-color: var(--onyx-color-text-icons-info-intense);
  }

  &__label {
    padding: 0 var(--onyx-spacing-4xs);
    font-size: 1rem;
  }
}
</style>
