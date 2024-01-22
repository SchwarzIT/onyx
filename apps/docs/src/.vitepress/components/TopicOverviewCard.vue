<script lang="ts" setup>
const props = defineProps<{
  title: string;
  subtitle: string;
  image: string;
  href: string;
}>();
</script>

<template>
  <a
    class="card"
    tabindex="0"
    :href="props.href"
    :target="props.href.startsWith('http') ? '_blank' : '_self'"
  >
    <img :src="props.image" :alt="props.title" width="7rem" height="7rem" class="card__image" />

    <div class="card__content">
      <h3 class="card__title">{{ props.title }}</h3>
      <p class="card__subtitle">{{ props.subtitle }}</p>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.card {
  padding: var(--onyx-spacing-xs);
  display: flex;
  border-radius: var(--onyx-radius-md);
  border: 1px solid var(--onyx-color-base-border-default);
  background: var(--onyx-color-base-background-blank);
  cursor: pointer;
  outline-color: var(--onyx-color-base-action-300);
  text-decoration: none;

  // hide VitePress external link icon
  &::after {
    display: none !important;
  }

  &__image {
    border-radius: var(--onyx-radius-sm);
    background: var(--onyx-color-base-neutral-300);
    height: 7rem;
    width: 7rem;
    object-fit: cover;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-xs);
    font-weight: 600;
    padding: var(--onyx-spacing-xs) var(--onyx-spacing-sm);
  }

  &__title {
    font-size: 1.25rem;
    margin: 0;
    color: var(--onyx-color-text-neutral-intense);
  }

  &__subtitle {
    color: var(--onyx-color-text-neutral-medium);
    margin: 0;
  }

  &:hover,
  &:focus-visible {
    border-color: var(--onyx-color-base-action-300);

    .card {
      &__title {
        color: var(--onyx-color-text-action-intense);
      }
    }
  }
}
</style>
