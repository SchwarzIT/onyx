<script lang="ts" setup>
import type { OnyxLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxLinkProps>(), {
  target: "_self",
});

const emit = defineEmits<{
  /**
   * Emitted when the link is opened (via click or keyboard).
   */
  click: [];
}>();

defineSlots<{
  /**
   * Link label.
   */
  default(props: Record<string, never>): unknown;
}>();
</script>

<template>
  <a
    class="onyx-link"
    :href="props.href"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noopener noreferrer' : undefined"
    @click="emit('click')"
  >
    <slot></slot>
  </a>
</template>

<style lang="scss">
.onyx-link {
  text-decoration: underline;
  color: var(--onyx-color-text-icons-primary-intense);

  // other styles like size, font family etc. should be inherited
  // so we don't define them here

  &:visited {
    color: var(--onyx-color-text-icons-primary-bold);
  }

  // make sure that hover has higher specificity than visited so that the hover color is also
  // applied to visited links
  &:hover {
    color: var(--onyx-color-text-icons-primary-medium);
  }

  &:focus-visible {
    color: var(--onyx-color-text-icons-primary-medium);
  }

  &:active {
    color: var(--onyx-color-text-icons-primary-bold);
  }
}
</style>
