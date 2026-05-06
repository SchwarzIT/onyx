<script lang="ts" setup>
const props = defineProps<{
  /**
   * Full component name.
   *
   * @example OnyxButton.
   */
  component: string;
}>();

const meta = computed(() => getComponentMeta(props.component));
</script>

<template>
  <div class="content">
    <ComponentMetaDataGrid :items="meta?.props" headline="Properties" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}
</style>
