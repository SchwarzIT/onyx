<script lang="ts" setup>
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
import type { EnrichedIcon } from "../utils-icons";

const props = defineProps<{
  icon: EnrichedIcon;
}>();
</script>

<template>
  <div class="icon" tabindex="0">
    <OnyxIcon
      :icon="props.icon.content"
      :color="props.icon.metadata.deprecated ? 'secondary' : 'currentColor'"
    />
    <span class="icon__tooltip">{{ props.icon.tooltipName }}</span>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  height: 3.5rem;
  width: 3.5rem;
  padding: var(--onyx-spacing-md);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0.0625rem solid transparent;
  position: relative;

  &__tooltip {
    position: absolute;
    top: 4rem;
    z-index: 1;
    visibility: hidden;

    padding: var(--onyx-spacing-4xs) var(--onyx-spacing-2xs);
    border-radius: var(--onyx-radius-xs);
    background: var(--onyx-color-base-neutral-900);
    color: var(--onyx-color-icon-neutral-inverted);
    font-size: 0.8125rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }

  &:hover,
  &:focus-visible {
    border-radius: var(--onyx-radius-md);
    border: 0.0625rem solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);
    outline-style: unset;

    .icon__tooltip {
      visibility: inherit;
    }
  }
}
</style>
