<script lang="ts" setup>
import { computed } from "vue";
import ComponentCard, { type ComponentCardProps } from "./ComponentCard.vue";

export type ComponentGridProps = {
  /** Description to show above the grid. */
  description: string;
  /** List of components to show. */
  components: ComponentCardProps[];
  /** Timestamp of estimated due date (will be formatted as month + year). */
  dueDate?: string;
};

const props = defineProps<ComponentGridProps>();

const formattedDueDate = computed(() => {
  if (!props.dueDate) return;
  const date = new Date(props.dueDate);
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
});

/**
 * Sorts components by: (1.) implemented first and (2.) alphabetically.
 */
const sortedComponents = computed(() => {
  return props.components
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
      if (a.implemented && !b.implemented) return -1;
      if (!a.implemented && b.implemented) return 1;
      return 0;
    });
});
</script>

<template>
  <div class="tier">
    <div class="tier__description">
      <p>{{ props.description }}</p>
      <p class="tier__date">Estimated due date: {{ formattedDueDate ?? "Not planned yet" }}</p>
    </div>

    <div class="tier__content">
      <ComponentCard
        v-for="component in sortedComponents"
        :key="component.name"
        v-bind="component"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tier {
  padding: 0.5rem 2rem 2rem;

  &__description {
    color: var(--vp-c-text-2);
    margin-bottom: 1.5rem;
  }

  &__date {
    margin-top: 0.5rem;
  }

  &__content {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
}
</style>
