<script lang="ts" setup>
const durations = [
  { name: "sm", cssVariable: "var(--onyx-duration-sm)", value: "400ms" },
  { name: "md", cssVariable: "var(--onyx-duration-md)", value: "700ms" },
  { name: "lg", cssVariable: "var(--onyx-duration-lg)", value: "1s" },
];
</script>

<template>
  <div class="onyx-grid">
    <OnyxCard v-for="duration in durations" :key="duration.name" class="onyx-grid-span-4 card">
      <OnyxAvatar :full-name="duration.name" />
      <OnyxSeparator class="card__separator" />

      <div class="card__details">
        <div class="detail">
          <span class="detail__label">{{ $t("duration") }}</span>
          <span class="detail__value">{{ duration.value }}</span>
        </div>

        <div class="detail">
          <span class="detail__label"> {{ $t("cssVariable") }} </span>
          <span class="detail__value">
            {{ duration.cssVariable }}
            <CopyButton :value="duration.cssVariable" />
          </span>
        </div>
      </div>
    </OnyxCard>
  </div>
</template>

<style lang="scss" scoped>
.card {
  align-items: center;

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

  &__label {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--onyx-density-2xs);
  }
}
</style>
