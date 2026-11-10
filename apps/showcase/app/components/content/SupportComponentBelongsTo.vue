<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    path: string;
    description?: string;
  }>(),
  {
    description:
      "This component is only a support component and should NOT be used standalone. Use it only together with the:",
  },
);
</script>

<template>
  <div>
    <ProseP>{{ props.description }}</ProseP>

    <div class="onyx-grid">
      <ComponentOverviewCard :path="props.path" class="onyx-grid-span-4" />
    </div>
  </div>
</template>
