<script lang="ts" setup>
const props = defineProps<{
  path: string;
}>();
</script>

<template>
  <div>
    <ProseP>
      This component is only a support component and should NOT be used standalone. Use it only
      together with the:
    </ProseP>

    <div class="onyx-grid">
      <ComponentOverviewCard :path="props.path" class="onyx-grid-span-4" />
    </div>
  </div>
</template>
