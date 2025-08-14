<script lang="ts" setup>
import { OnyxHeadline, OnyxSeparator } from "sit-onyx";
import { computed } from "vue";
import type { ComponentCardProps } from "./ComponentCard.vue";
import ComponentCard from "./ComponentCard.vue";
import ComponentStatusBadge, { ComponentStatus } from "./ComponentStatusBadge.vue";

const props = defineProps<{
  components: ComponentCardProps[];
}>();

const getComponentsByStatus = computed(() => {
  return (status: ComponentStatus) =>
    props.components
      .filter((component) => component.status === status)
      .sort((a, b) => a.name.localeCompare(b.name));
});

const componentsByStatus = computed(() => {
  return {
    "in-progress": getComponentsByStatus.value("in-progress"),
    planned: getComponentsByStatus.value("planned"),
    implemented: getComponentsByStatus.value("implemented"),
  } satisfies Record<ComponentStatus, ComponentCardProps[]>;
});
</script>

<template>
  <section class="components">
    <OnyxHeadline is="h2" class="components__headline" hash="components">Components</OnyxHeadline>

    <p class="components__description">
      Below you can find a list of components that have already been implemented, are currently
      actively developed or are planned. Feel free to check this page regularly, we will keep it up
      to date with our progress.
    </p>

    <p class="components__description">
      <b>Tip:</b> You can click on a component to see its implementation and documentation.
    </p>

    <div class="components__legend">
      <template v-for="(components, status) in componentsByStatus" :key="status">
        <ComponentStatusBadge
          v-if="components.length"
          :status="status"
          :count="components.length"
          show-label
        />
      </template>
    </div>

    <div class="components__cards">
      <ComponentCard
        v-for="component in [...componentsByStatus['in-progress'], ...componentsByStatus.planned]"
        :key="component.name"
        v-bind="component"
      />
    </div>

    <OnyxSeparator class="components__separator" />

    <div class="components__cards">
      <ComponentCard
        v-for="component in componentsByStatus.implemented"
        :key="component.name"
        v-bind="component"
      />
    </div>
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

  &__separator {
    margin: var(--onyx-density-md) 0;
  }
}
</style>
