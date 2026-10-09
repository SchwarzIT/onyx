<script lang="ts" setup>
const props = defineProps<{
  headline: string;
  description?: string;
}>();
</script>

<template>
  <section class="hero">
    <div class="hero__content onyx-grid-layout">
      <OnyxHeadline is="h1" class="hero__headline">{{ props.headline }}</OnyxHeadline>

      <p v-if="props.description" class="hero__description">
        {{ props.description }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.hero {
  --hero-headline-size: clamp(2rem, 4cqw, 3rem);
  background-color: var(--onyx-color-base-background-blank);
  border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);
    padding-block: var(--onyx-density-2xl);

    @include breakpoints.container(max, sm) {
      padding-block: var(--onyx-density-xl);
    }
  }

  &__headline {
    font-size: var(--hero-headline-size);
    line-height: var(--hero-headline-size);
    overflow-wrap: break-word;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
