<script lang="ts" setup>
definePageMeta({ layout: "components" });
</script>

<template>
  <div>
    <ProseH1>{{ $t("components.component", 2) }}</ProseH1>

    <OnyxInfoCard headline="Coming Soon" color="warning">
      This page is currently work in progress and will be available soon.
    </OnyxInfoCard>

    <!-- TODO: add an overview / list of all available components here -->
  </div>
</template>
