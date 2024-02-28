<script lang="ts" setup>
import { isExternalLink } from "@/utils";
import expandWindow from "@sit-onyx/icons/expand-window.svg?raw";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxLinkProps>(), {
  target: "_self",
  hideExternalLink: false,
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
    <OnyxIcon
      v-if="!props.hideExternalLink && isExternalLink(props.href)"
      :icon="expandWindow"
      size="16px"
    />
  </a>
</template>

<style lang="scss">
.onyx-link {
  text-decoration: underline;
  color: var(--onyx-color-text-icons-primary-intense);
  border: 1px solid transparent;

  display: inline-flex;
  gap: var(--onyx-spacing-2xs);
  align-items: center;

  // other styles like size, font family etc. should be inherited
  // so we don't define them here

  &:hover {
    color: var(--onyx-color-text-icons-primary-medium);
  }

  &:focus-visible {
    color: var(--onyx-color-text-icons-primary-intense);
    border-radius: var(--onyx-radius-sm);
    border-color: var(--onyx-color-base-primary-300);
    outline: none;
  }

  &:active {
    color: var(--onyx-color-text-icons-primary-bold);
  }

  &:visited {
    color: var(--onyx-color-text-icons-primary-bold);

    &:hover {
      color: var(--onyx-color-text-icons-primary-intense);
    }
  }
}
</style>
