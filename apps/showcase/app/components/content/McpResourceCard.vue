<script lang="ts" setup>
const props = defineProps<{
  headline: string;
  uri: string;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="card">
    <OnyxHeadline is="h2">{{ props.headline }}</OnyxHeadline>
    <div class="card__uri onyx-text--small">{{ props.uri }}</div>

    <div class="card__content">
      <slot></slot>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  gap: var(--onyx-density-2xs);

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xs);
    margin-top: var(--onyx-density-xs);

    :deep(p) {
      margin: 0;
    }

    :deep(> :first-child) {
      margin-top: 0;
    }

    :deep(> :last-child) {
      margin-bottom: 0;
    }
  }

  &__uri {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
