<script lang="ts" setup>
import { OnyxCard, OnyxHeadline } from "../../../index.js";
</script>

<template>
  <OnyxCard class="card">
    <OnyxHeadline is="h2">Example headline</OnyxHeadline>

    <p class="card__description">
      Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat.
      Vel nec aliquet lorem turpis eu dui. At pellentesque senectus sed volutpat vitae nulla. Nisl
      cursus dignissim sed eget neque tristique interdum pretium elit.
    </p>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  width: 20rem;

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
