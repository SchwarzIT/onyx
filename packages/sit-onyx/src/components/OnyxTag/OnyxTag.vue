<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "primary",
  density: "default",
});
</script>

<template>
  <div class="onyx-tag" :class="[`onyx-tag--${props.color}`]">
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-tag__label onyx-truncation-ellipsis">{{ props.label }}</span>
  </div>
</template>

<style lang="scss">
.onyx-tag {
  --onyx-tag-text-color: var(--onyx-color-text-icons-primary-intense);
  --onyx-tag-background-color: var(--onyx-color-text-icons-primary-300);

  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  color: var(--onyx-tag-text-color);
  font-family: var(--onyx-font-family);
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  border-radius: var(--onyx-radius-sm);
  border: 1px solid var(--onyx-tag-text-color);
  background-color: var(--onyx-tag-background-color);

  $colors: primary, secondary, danger, warning, success, info;

  @each $color in $colors {
    &--#{$color} {
      --onyx-tag-text-color: var(--onyx-color-text-icons-#{$color}-intense);
    }
  }

  &__label {
    padding: 0 var(--onyx-spacing-4xs);
    font-size: 1rem;
  }
}
</style>
