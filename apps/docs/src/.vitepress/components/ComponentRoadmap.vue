<script lang="ts" setup>
import { OnyxButton, OnyxHeadline } from "sit-onyx";
import { computed, ref } from "vue";
import type { ComponentCardProps } from "./ComponentCard.vue";
import ComponentCard from "./ComponentCard.vue";
import ComponentStatusBadge from "./ComponentStatusBadge.vue";

const props = defineProps<{
  components: ComponentCardProps[];
}>();

/** If true, all components should be shown instead of only the first 12. */
const showAll = ref(true);

/**
 * Sorts components by: (1.) status (2.) due date and (3.) alphabetically.
 */
const sortedComponents = computed(() => {
  return props.components
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => a.status.localeCompare(b.status));
});

/**
 * We only want to show status in the legend that are actually used.
 */
const usedStatus = computed(() => {
  const status = sortedComponents.value.map((component) => component.status);
  return [...new Set(status)];
});

/**
 * Components that should be displayed (considers the show all button).
 */
const displayedComponents = computed(() => {
  return sortedComponents.value.slice(0, showAll.value ? undefined : 16);
});

/**
 * Whether the "show more" / "show less" button should be shown.
 */
const shouldShowAllButton = computed(() => {
  return showAll.value || displayedComponents.value.length < sortedComponents.value.length;
});
</script>

<template>
  <section class="components">
    <OnyxHeadline is="h2" class="components__headline" hash="components">Components</OnyxHeadline>

    <p class="components__description">
      onyx is currently in beta version and early / active development. Below you can find a list of
      components that we are planning to implement as well as their estimated due date. Feel free to
      check this page regularly, we will keep it up to date with our progress.
    </p>

    <p class="components__description">
      <b>Tip:</b> You can click on a component to see its implementation and documentation.
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
    line-height: var(--onyx-font-line-height-xl);
  }

  &__description {
    margin: 0;
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
