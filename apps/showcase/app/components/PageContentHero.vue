<script lang="ts" setup>
import defaultImage from "~/assets/images/page-hero-fallback.webp";

const props = withDefaults(
  defineProps<{
    headline?: string;
    description?: string;
    image?: string;
  }>(),
  {
    image: defaultImage,
  },
);
</script>

<template>
  <section class="hero onyx-grid-layout">
    <div class="hero__wrapper">
      <div class="hero__content">
        <OnyxHeadline is="h1" class="hero__headline">{{ props.headline }}</OnyxHeadline>

        <p v-if="props.description" class="hero__description">
          {{ props.description }}
        </p>
      </div>

      <div class="hero__image" :style="{ backgroundImage: `url('${props.image}')` }"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.hero {
  --hero-headline-size: 3rem;
  padding-bottom: 0;

  &__wrapper {
    background-color: var(--onyx-color-base-background-blank);
    border-radius: var(--onyx-radius-lg);
    box-shadow: var(--onyx-shadow-medium-bottom);
    display: flex;
    justify-content: space-between;
    gap: var(--onyx-density-3xl);
  }

  &__content {
    padding: var(--onyx-density-lg);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);
  }

  &__image {
    width: 40%;
    min-height: 12rem;
    flex-shrink: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    background-size: cover;
    background-position: center;
  }

  &__headline {
    font-size: var(--hero-headline-size);
    line-height: var(--hero-headline-size);
    overflow-wrap: break-word;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  // responsive styles
  @include breakpoints.container(max, md) {
    --hero-headline-size: 2rem;

    .hero__wrapper {
      flex-direction: column-reverse;
      gap: var(--onyx-density-xs);
    }

    .hero__image {
      width: 100%;
      border-bottom-right-radius: 0;
      border-top-left-radius: inherit;
    }
  }
}
</style>
