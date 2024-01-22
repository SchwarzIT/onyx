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
  <div class="card">
    <article class="card__content">
      <Badge
        v-if="props.implemented"
        class="card__badge card__badge--implemented"
        text="Implemented"
      />
      <Badge v-else class="card__badge" text="Planned" type="info" />
      <h4 class="card__title">{{ props.name }}</h4>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: block;
  border: 1px solid var(--vp-c-default-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg);
  transition:
    border-color 0.25s,
    background-color 0.25s;

  &__content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100%;
  }

  &__title {
    font-size: 1.5rem;
    line-height: 1.5rem;
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
