<script lang="ts" setup>
import { computed } from "vue";
import ComponentCard from "./ComponentCard.vue";

export type ComponentGridProps = {
  description: string;
  components: Component[];
  dueDate?: string;
};

export type Component = {
  name: string;
  comingSoon?: boolean;
};

const props = defineProps<ComponentGridProps>();

const formattedDueDate = computed(() => {
  if (!props.dueDate) return;
  const date = new Date(props.dueDate);
  return Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
});

const sortedComponents = computed(() => {
  return props.components
    .slice()
    .sort((a, b) => {
      if (a.comingSoon && !b.comingSoon) return 1;
      if (b.comingSoon && !a.comingSoon) return -1;
      return 0;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<template>
  <div>
    <div class="description">
      <p>{{ props.description }}</p>
      <p>Estimated due date: {{ formattedDueDate ?? "Not planned yet" }}</p>
    </div>

    <div class="grid">
      <ComponentCard
        v-for="component in sortedComponents"
        :key="component.name"
        v-bind="component"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  color: var(--vp-c-text-2);
  margin: 2rem;
}

.grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
</style>
