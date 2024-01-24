<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  /** Title. If a number is passed it will be formatted with `.toLocaleString()` */
  title: string | number;
  /** Description / sub title. */
  description: string;
  /** Link to open. */
  href?: string;
}>();

const target = computed(() => (props.href?.startsWith("http") ? "_blank" : "_self"));
</script>

<template>
  <component
    :is="props.href ? 'a' : 'div'"
    :href="props.href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="card"
    :class="{ 'card--clickable': props.href }"
  >
    <article class="card__content">
      <p class="card__title">{{ props.title?.toLocaleString() }}</p>
      <h4 class="card__description">{{ props.description }}</h4>
    </article>
  </component>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--vp-c-default-soft);
  border-radius: 0.75rem;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;

  &--clickable {
    &:hover {
      background-color: var(--vp-c-default-soft);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
    height: 100%;
  }

  &__title {
    font-size: 2.5rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  &__description {
    color: var(--vp-c-text-2);
    font-size: 1.25rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
}

.dark {
  .card {
    &--clickable {
      &:hover {
        background-color: var(--onyx-color-base-neutral-300);
      }
    }
  }
}
</style>
