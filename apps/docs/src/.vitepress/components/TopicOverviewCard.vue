<script lang="ts" setup>
const props = defineProps<{
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
}>();
</script>

<template>
  <a class="topic" tabindex="0" :href="props.href">
    <img :src="props.imageSrc" :alt="props.title" width="7rem" height="7rem" class="topic__image" />

    <div class="topic__content">
      <h3 class="topic__title">{{ props.title }}</h3>
      <p class="topic__subtitle">{{ props.subtitle }}</p>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.topic {
  padding: var(--onyx-spacing-2xs);
  display: flex;
  border-radius: var(--onyx-radius-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background: var(--onyx-color-base-background-blank);
  cursor: pointer;
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
    gap: var(--onyx-spacing-2xs);
    font-weight: var(--onyx-font-weight-semibold);
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
  }

  &__title {
    font-size: var(--onyx-font-size-lg);
    line-height: var(--onyx-font-line-height-lg);
    margin: 0;
    color: var(--onyx-color-text-icons-neutral-intense);
  }

  &__subtitle {
    color: var(--onyx-color-text-icons-neutral-medium);
    margin: 0;
    line-height: var(--onyx-font-line-height-md);
  }

  &:hover,
  &:focus-visible {
    .topic {
      &__title {
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }
  }

  &:hover {
    border-color: var(--onyx-color-component-border-primary-hover);
  }

  &:focus-visible {
    border-color: var(--onyx-color-component-border-primary);
    outline-color: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
  }
}
</style>
