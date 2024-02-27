<script lang="ts" setup>
import type { OnyxLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxLinkProps>(), {
  target: "_self",
  size: "default",
  monospace: false,
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
    class="onyx-link onyx-text"
    :class="[
      props.size !== 'default' ? `onyx-text--${props.size}` : '',
      props.monospace ? 'onyx-text--monospace' : '',
    ]"
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
}
</style>
