<script lang="ts" setup>
import { OnyxTable } from "sit-onyx";
import { computed, type VNode } from "vue";

const slots = defineSlots<{
  default(): VNode[];
}>();

/**
 * Extracts all table rows `<tr>` vnodes from the given vnode (e.g. table head or body).
 */
const extractTableRows = (vnode?: VNode): VNode[] => {
  if (!vnode || !vnode.children) {
    return [];
  }

  // handle if the VNode is a native HTML element (has an array of children)
  if (Array.isArray(vnode.children)) {
    return vnode.children as VNode[];
  }

  // handle if the VNode is a Vue Component (has slots)
  if (
    typeof vnode.children === "object" &&
    !Array.isArray(vnode.children) &&
    "default" in vnode.children &&
    typeof vnode.children.default === "function"
  ) {
    return vnode.children.default();
  }

  return [];
};

const content = computed(() => {
  const children = slots.default?.() ?? [];
  const [head, body] = children;

  return {
    headRows: extractTableRows(head),
    bodyRows: extractTableRows(body),
  };
});
</script>

<template>
  <OnyxTable class="table" striped with-vertical-borders>
    <template #head>
      <component :is="tr" v-for="tr in content.headRows" :key="tr.key" />
    </template>

    <component :is="tr" v-for="tr in content.bodyRows" :key="tr.key" />
  </OnyxTable>
</template>

<style lang="scss" scoped>
.table {
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
