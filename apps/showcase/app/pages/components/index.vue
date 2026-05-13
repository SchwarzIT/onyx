<script lang="ts" setup>
definePageMeta({ layout: "components" });
</script>

<template>
  <div class="page">
    <OnyxHeadline is="h1">{{ $t("components.component", 2) }}</OnyxHeadline>

    <OnyxInfoCard headline="Coming Soon" color="warning">
      This page is currently work in progress and will be available soon.
    </OnyxInfoCard>

    <!-- TODO: add an overview / list of all available components here -->
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}
</style>
