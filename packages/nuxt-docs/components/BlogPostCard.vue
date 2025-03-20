<script lang="ts" setup>
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";

const props = defineProps<{
  headline: string;
  image: string;
  description: string;
  href: string;
  date?: string;
}>();

const handleNavigate = () => {
  navigateTo(props.href);
};
</script>

<template>
  <OnyxCard class="card">
    <img class="card__image" alt="Example image" :height="128" :src="props.image" />

    <div class="card__header">
      <div>
        <div v-if="props.date" class="card__date onyx-text--small">
          {{ props.date }}
        </div>
        <OnyxHeadline is="h2">{{ props.headline }}</OnyxHeadline>
      </div>

      <OnyxFlyoutMenu label="Actions" trigger="click">
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

    <p class="card__description">{{ props.description }}</p>

    <div class="card__tags">
      <OnyxTag v-for="i in 4" :key="i" label="Tag" color="neutral" />
    </div>

    <OnyxButton class="card__button" label="Read more" @click="handleNavigate" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);

  &__image {
    border-radius: var(--onyx-radius-sm);
    background-color: var(--onyx-color-base-neutral-200);
  }

  &__date {
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
