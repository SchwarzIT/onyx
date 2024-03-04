<script lang="ts" setup>
import { computed, ref } from "vue";
import OnyxButton from "~components/OnyxButton/OnyxButton.vue";
import OnyxHeadline from "~components/OnyxHeadline/OnyxHeadline.vue";
import type { ComponentCardProps } from "./ComponentCard.vue";
import ComponentCard from "./ComponentCard.vue";
import ComponentStatusBadge from "./ComponentStatusBadge.vue";

const props = defineProps<{
  components: ComponentCardProps[];
}>();

const showAll = ref(false);

/**
 * Sorts components by: (1.) status (2.) estimation date and (3.) alphabetically.
 */
const sortedComponents = computed(() => {
  return props.components
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
      if (!a.estimation) return 1;
      if (!b.estimation) return -1;
      return new Date(a.estimation).getTime() - new Date(b.estimation).getTime();
    })
    .sort((a, b) => a.status.localeCompare(b.status));
});

/**
 * We only want to show status in the legend that are actually used.
 */
const usedStatus = computed(() => {
  const status = sortedComponents.value.map((component) => component.status);
  return [...new Set(status)];
});

const displayedComponents = computed(() => {
  if (showAll.value) return sortedComponents.value;
  return sortedComponents.value.slice(0, 12);
});

const shouldShowAllButton = computed(() => {
  return showAll.value || displayedComponents.value.length < sortedComponents.value.length;
});
</script>

<template>
  <section class="components">
    <OnyxHeadline is="h2" class="components__headline">Components</OnyxHeadline>

    <p>
      onyx is currently in early / active development. Below you can find a list of components that
      we are planning to implement as well as their estimated due date. Feel free to check this page
      regularly, we will keep it up to date with our progress.
    </p>

    <div class="components__legend">
      <ComponentStatusBadge
        v-for="status in usedStatus"
        :key="status"
        :status="status"
        show-label
      />
    </div>

    <div class="components__cards">
      <ComponentCard
        v-for="component in displayedComponents"
        :key="component.name"
        v-bind="component"
      />
    </div>

    <OnyxButton
      v-if="shouldShowAllButton"
      class="components__button"
      :label="showAll ? 'Show less' : 'Show more'"
      mode="plain"
      @click="showAll = !showAll"
    />
  </section>
</template>

<style lang="scss" scoped>
.components {
  display: grid;
  gap: var(--onyx-spacing-lg);
  color: var(--onyx-color-text-icons-neutral-intense);

  &__headline {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }

  &__legend {
    display: flex;
    gap: var(--onyx-spacing-lg);
    flex-wrap: wrap;
  }

  &__cards {
    display: grid;
    grid-gap: var(--onyx-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }

  &__button {
    width: max-content;
  }
}
</style>
