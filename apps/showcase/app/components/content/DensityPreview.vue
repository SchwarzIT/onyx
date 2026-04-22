<script lang="ts" setup>
const descriptionId = useId();
</script>

<template>
  <div class="preview">
    <OnyxCard class="preview__card" :aria-describedby="descriptionId">
      <OnyxButton :label="$t('densities.compact')" density="compact" />
      <OnyxButton :label="$t('densities.default')" density="default" />
      <OnyxButton :label="$t('densities.cozy')" density="cozy" />
    </OnyxCard>

    <div :id="descriptionId" class="onyx-text--small preview__description">
      {{ $t("densities.preview.description") }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-2xs);

  &__card {
    --onyx-card-gap: var(--onyx-grid-gutter);
    padding-block: var(--onyx-density-2xl);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-grow: 1;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
