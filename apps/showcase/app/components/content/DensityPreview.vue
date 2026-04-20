<template>
  <OnyxCard class="preview">
    <OnyxButton label="Compact" density="compact" />
    <OnyxButton label="Default" density="default" />
    <OnyxButton label="Cozy" density="cozy" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.preview {
  --onyx-card-gap: var(--onyx-grid-gutter);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
