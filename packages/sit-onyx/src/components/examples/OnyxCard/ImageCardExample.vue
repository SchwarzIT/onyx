<script lang="ts" setup>
import { OnyxCard, OnyxHeadline } from "../../..";
</script>

<template>
  <OnyxCard class="card">
    <img
      class="card__image"
      alt="Example image"
      :height="128"
      src="https://picsum.photos/256/128"
    />

    <OnyxHeadline is="h2">Example headline</OnyxHeadline>

    Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat. Vel
    nec aliquet lorem turpis eu dui. At pellentesque senectus sed volutpat vitae nulla. Nisl cursus
    dignissim sed eget neque tristique interdum pretium elit.
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  width: 20rem;

  &__image {
    border-radius: var(--onyx-radius-sm);
    margin-bottom: var(--onyx-card-gap);
    background-color: var(--onyx-color-base-neutral-200);
  }
}
</style>
