<script lang="ts" setup>
import type { VNode } from "vue";

const slots = defineSlots<{
  default(): VNode[];
}>();

/**
 * Extracts all table rows `<tr>` vnodes from the given vnode (e.g. table head or body).
 */
const extractTableRows = (vnode?: VNode): VNode[] => {
  if (
    !vnode?.children ||
    typeof vnode.children !== "object" ||
    !("default" in vnode.children) ||
    typeof vnode.children.default !== "function"
  ) {
    return [];
  }

  return vnode.children.default();
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
  <OnyxTable striped with-vertical-borders>
    <template #head>
      <component :is="tr" v-for="tr in content.headRows" :key="tr.key" />
    </template>

    <component :is="tr" v-for="tr in content.bodyRows" :key="tr.key" />
  </OnyxTable>
</template>
