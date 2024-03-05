<script lang="ts" setup>
import { computed } from "vue";
import OnyxHeadline from "~components/OnyxHeadline/OnyxHeadline.vue";
import type { ComponentStatus } from "./ComponentStatusBadge.vue";
import ComponentStatusBadge from "./ComponentStatusBadge.vue";

export type ComponentCardProps = {
  /** Component name. */
  name: string;
  /** Component status. */
  status: ComponentStatus;
  /** Link to the component. */
  href?: string;
  /**
   * Estimation date when the component will be implemented.
   * Only the month and year of the date will be shown.
   * If unset, "n/a" will be displayed.
   */
  estimation?: ConstructorParameters<typeof Date>[0];
};

const props = defineProps<ComponentCardProps>();

const dateFormatter = Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  year: "numeric",
});

const estimationValue = computed(() => {
  if (!props.estimation) return "n/a";
  return dateFormatter.format(new Date(props.estimation));
});
</script>

<template>
  <component
    :is="props.href ? 'a' : 'article'"
    class="card"
    :class="{ 'card--clickable': props.href }"
    :href="props.href"
  >
    <div class="card__header">
      <p class="estimation">
        Estimation:
        <span class="estimation__value">{{ estimationValue }}</span>
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
    justify-content: space-between;
    gap: var(--onyx-spacing-3xs);
    width: 100%;
  }

  .estimation {
    margin: 0;
    color: var(--onyx-color-text-icons-neutral-medium);

    &__value {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
