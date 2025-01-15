<script lang="ts" setup>
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import {
  OnyxButton,
  OnyxCard,
  OnyxFlyoutMenu,
  OnyxHeadline,
  OnyxMenuItem,
  OnyxSystemButton,
  OnyxTag,
} from "../../..";
</script>

<template>
  <OnyxCard class="card">
    <img
      class="card__image"
      alt="Example image"
      :height="128"
      src="https://picsum.photos/256/128"
    />

    <div class="card__header">
      <div>
        <div class="card__category onyx-text--small">Category name</div>
        <OnyxHeadline is="h2">Example headline</OnyxHeadline>
      </div>

      <OnyxFlyoutMenu label="Actions">
        <template #button="{ trigger }">
          <OnyxSystemButton v-bind="trigger" :icon="moreVertical" label="Open link" />
        </template>

        <template #options>
          <OnyxMenuItem>Action 1</OnyxMenuItem>
          <OnyxMenuItem>Action 2</OnyxMenuItem>
          <OnyxMenuItem>Action 3</OnyxMenuItem>
        </template>
      </OnyxFlyoutMenu>
    </div>

    <p class="card__description">
      Lorem ipsum dolor sit amet consectetur. Id neque viverra faucibus ullamcorper dui volutpat.
      Vel nec aliquet lorem turpis eu dui. At pellentesque senectus sed volutpat vitae nulla. Nisl
      cursus dignissim sed eget neque tristique interdum pretium elit.
    </p>

    <div class="card__tags">
      <OnyxTag v-for="i in 4" :key="i" label="Tag" color="neutral" />
    </div>

    <OnyxButton class="card__button" label="Button" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);
  width: 20rem;

  &__image {
    border-radius: var(--onyx-radius-sm);
    background-color: var(--onyx-color-base-neutral-200);
  }

  &__category {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-card-gap);
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-xs);
  }

  &__button {
    width: 100%;
  }
}
</style>
