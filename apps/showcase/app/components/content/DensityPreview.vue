<script lang="ts" setup>
const descriptionId = useId();
</script>

<template>
  <div class="preview">
    <OnyxCard class="preview__card" :aria-describedby="descriptionId">
      <OnyxButton label="Compact" density="compact" />
      <OnyxButton label="Default" density="default" />
      <OnyxButton label="Cozy" density="cozy" />
    </OnyxCard>

    <div :id="descriptionId" class="onyx-text--small preview__description">
      A preview of the different densities using buttons as an example.
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
