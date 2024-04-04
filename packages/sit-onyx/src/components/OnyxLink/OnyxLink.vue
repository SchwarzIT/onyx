<script lang="ts" setup>
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import { computed } from "vue";
import { isExternalLink } from "../../utils";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxLinkProps>(), {
  target: "_self",
  withExternalIcon: "auto",
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

const shouldShowExternalIcon = computed(() => {
  if (props.withExternalIcon !== "auto") return props.withExternalIcon;
  return isExternalLink(props.href);
});
</script>

<template>
  <a
    class="onyx-link"
    :href="props.href"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noreferrer' : undefined"
    @click="emit('click')"
  >
    <slot></slot>
    <OnyxIcon
      v-if="shouldShowExternalIcon"
      class="onyx-link__icon"
      :icon="arrowSmallUpRight"
      size="16px"
    />
  </a>
</template>

<style lang="scss">
@use "@/styles/mixins/layers.scss";

.onyx-link {
  @include layers.component() {
    text-decoration: underline;
    color: var(--onyx-color-text-icons-primary-intense);
    display: inline-block;

    // other styles like size, font family etc. should be inherited
    // so we don't define them here

    &:hover {
      color: var(--onyx-color-text-icons-primary-medium);
    }

    &:focus-visible {
      color: var(--onyx-color-text-icons-primary-intense);
      border-radius: var(--onyx-radius-sm);
      outline: var(--onyx-1px-in-rem) solid var(--onyx-color-base-primary-300);
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

    &__icon {
      margin-left: var(--onyx-spacing-5xs);
    }
  }
}
</style>
