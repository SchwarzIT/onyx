<script lang="ts" setup>
export type ComponentCardProps = {
  /** Component name. */
  name: string;
  /** If true an "Implemented" badge will be shown, "Planned" otherwise. */
  implemented?: boolean;
};

const props = defineProps<ComponentCardProps>();
</script>

<template>
  <article class="card">
    <Badge
      v-if="props.implemented"
      class="card__badge card__badge--implemented"
      text="Implemented"
    />
    <Badge v-else class="card__badge" text="Planned" type="info" />
    <h4 class="card__title">{{ props.name }}</h4>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: block;
  border: 1px solid var(--vp-c-default-soft);
  border-radius: 0.75rem;
  height: 100%;
  background-color: var(--vp-c-bg);
  padding: 1.5rem;
  transition:
    border-color 0.25s,
    background-color 0.25s;

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &__badge {
    width: max-content;
    margin-left: 0;
    margin-bottom: 0.5rem;

    &--implemented {
      color: var(--vp-c-brand-2);
      background-color: var(--vp-c-brand-soft);
    }
  }
}
</style>
