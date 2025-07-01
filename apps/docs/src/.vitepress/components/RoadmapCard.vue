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
    :rel="target === '_blank' ? 'noreferrer' : undefined"
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
  border: var(--onyx-1px-in-rem) solid var(--vp-c-default-soft);
  border-radius: 0.75rem;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;

  text-decoration: none;
  color: inherit;

  &--clickable {
    display: block;

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
    box-sizing: border-box;
    background-color: inherit;
    border-radius: inherit;
  }

  &__title {
    font-size: 2.5rem;
    line-height: var(--onyx-font-line-height-xl);
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  &__description {
    color: var(--vp-c-text-2);
    font-size: var(--onyx-font-size-lg);
    line-height: var(--onyx-font-line-height-sm);
    font-weight: 500;
    margin: 0;
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
