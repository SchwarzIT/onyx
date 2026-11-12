<script lang="ts" setup>
const props = defineProps<{
  headline: string;
  subtitle?: string;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="card">
    <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
    <div v-if="props.subtitle" class="card__subtitle onyx-text--small">{{ props.subtitle }}</div>

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

    :deep(> :first-child) {
      margin-top: 0;
    }

    :deep(> :last-child) {
      margin-bottom: 0;
    }
  }

  &__subtitle {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
