<script lang="ts" setup>
type DetailsItem = {
  label: string;
  value: string;
  copy?: boolean;
};

const props = defineProps<{
  name: string;
  items: DetailsItem[];
  color?: "default" | "neutral";
}>();
</script>

<template>
  <OnyxCard :class="['card', 'onyx-grid-span-4', { 'card--neutral': props.color === 'neutral' }]">
    <OnyxAvatar class="card__avatar" :full-name="props.name" :initials="props.name" />

    <OnyxSeparator class="card__separator" />

    <div class="card__details">
      <div v-for="item in props.items" :key="item.label" class="detail">
        <span> {{ item.label }} </span>
        <span class="detail__value">
          {{ item.value }}
          <CopyButton v-if="item.copy" :value="item.value" />
        </span>
      </div>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  align-items: center;
  color: var(--onyx-color-text-icons-neutral-medium);

  &--neutral {
    color: var(--onyx-color-text-icons-neutral-soft);
    border-color: var(--onyx-color-component-border-disabled);
    background-color: var(--onyx-color-base-background-tinted);

    .card__avatar,
    .card__separator {
      color: inherit;
      background-color: var(--onyx-color-base-neutral-200);
    }
  }

  &__separator {
    width: 100%;
    margin-block: var(--onyx-card-gap);
  }

  &__details {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--onyx-card-gap);
  }
}

.detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--onyx-density-xs);
  flex-wrap: wrap;

  &__value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--onyx-density-2xs);
  }
}
</style>
