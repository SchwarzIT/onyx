<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import type { ComponentStatus } from "./ComponentStatusBadge.vue";
import ComponentStatusBadge from "./ComponentStatusBadge.vue";

export type ComponentCardProps = {
  /** Component name. */
  name: string;
} & (
  | {
      /** Component status. */
      status: Exclude<ComponentStatus, "implemented">;
      /** Link to the components storybook. */
      href?: string;
    }
  | {
      status: Extract<ComponentStatus, "implemented">;
      /**
       * Require `href`, when status is "implemented".
       */
      href: string;
    }
);

const props = defineProps<ComponentCardProps>();
</script>

<template>
  <component
    :is="props.href ? 'a' : 'article'"
    class="card"
    :class="{ 'card--clickable': props.href }"
    :href="props.href"
    :target="props.href?.startsWith('http') ? '_blank' : '_self'"
  >
    <OnyxHeadline is="h3" visual-size="h2">{{ props.name }}</OnyxHeadline>
    <ComponentStatusBadge :status="props.status" class="card__status" />
  </component>
</template>

<style lang="scss" scoped>
.card {
  border: var(--onyx-1px-in-rem) solid var(--vp-c-default-soft);
  border-radius: var(--onyx-radius-lg);
  background-color: var(--onyx-color-base-background-blank);
  padding: var(--onyx-spacing-md);
  transition:
    border-color var(--onyx-duration-sm),
    background-color var(--onyx-duration-sm);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--onyx-spacing-4xs);

  outline-color: var(--onyx-color-base-primary-500);
  text-decoration: none;
  color: inherit;

  &--clickable {
    &:hover,
    &:focus-visible {
      background-color: var(--onyx-color-base-primary-100);
    }
  }

  &__status {
    margin-left: auto;
  }

  &::after {
    // hide VitePress external link icon
    display: none !important;
  }
}
</style>
