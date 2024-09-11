<script lang="ts" setup>
import OnyxHeadline from "~components/OnyxHeadline/OnyxHeadline.vue";
import type { ComponentStatus } from "./ComponentStatusBadge.vue";
import ComponentStatusBadge from "./ComponentStatusBadge.vue";

export type ComponentCardProps = {
  /** Component name. */
  name: string;
  /**
   * Due date when the component will be implemented.
   * Will only be shown if status is not "implemented".
   * If unset, "n/a" will be displayed.
   *
   * @example "Q2 2024"
   */
  dueDate?: string;
} & (
  | {
      /** Component status. */
      status: Extract<ComponentStatus, "in-progress" | "planned">;
      /** Link to the components storybook. */
      href?: string;
    }
  | {
      status: Exclude<ComponentStatus, "in-progress" | "planned">;
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
    <div class="card__header">
      <p class="card__due-date" v-if="props.status !== 'implemented'">
        Due: {{ props.dueDate || "n/a" }}
      </p>
      <ComponentStatusBadge :status="props.status" class="card__status" />
    </div>

    <OnyxHeadline is="h2">{{ props.name }}</OnyxHeadline>
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
  flex-direction: column;
  align-items: flex-start;
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

  &__header {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-3xs);
    width: 100%;
  }

  &__due-date {
    margin: 0;
    color: var(--onyx-color-text-icons-neutral-soft);
  }

  &::after {
    // hide VitePress external link icon
    display: none !important;
  }
}
</style>
