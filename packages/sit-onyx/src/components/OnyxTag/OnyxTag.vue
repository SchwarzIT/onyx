<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  type: "primary",
});
</script>

<template>
  <div :class="['onyx-tag', `onyx-tag--${props.type}`]">
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-tag__label onyx-truncation-ellipsis">{{ props.label }}</span>
  </div>
</template>

<style lang="scss">
.onyx-tag {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  color: var(--onyx-tag-text-color);
  font-family: var(--onyx-font-family);
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  border-radius: var(--onyx-radius-sm);
  border: 1px solid var(--onyx-tag-text-color);
  background-color: var(--onyx-tag-background-color);

  /// [TODO] ask primary and secondary colors are different between code and figma for OnyxTag to Onyx team members.
  /// Checked that primary and secondary colors are set the same in variables-onyx.css file
  $colors: primary, secondary, danger, warning, success, info;

  @each $color in $colors {
    &--#{$color} {
      --onyx-tag-text-color: var(--onyx-color-base-#{$color}-800);
      --onyx-tag-background-color: var(--onyx-color-base-#{$color}-100);
    }
  }

  &__label {
    padding: 0 var(--onyx-spacing-4xs);
    font-size: 1rem;
  }
}
</style>
