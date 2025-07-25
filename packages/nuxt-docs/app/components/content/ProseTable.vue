<script lang="ts" setup>
import type { VNode } from "vue";

const slots = defineSlots<{
  default(): VNode[];
}>();

/**
 * Extracts the table head and body as vnodes from the slot content.
 */
const extractSlotContent = () => {
  const [head, body] = slots.default();

  return {
    headRows: extractTableRows(head),
    bodyRows: extractTableRows(body),
  };
};

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

const content = shallowRef(extractSlotContent());
onBeforeUpdate(() => (content.value = extractSlotContent())); // update content when component is updated
</script>

<template>
  <OnyxTable striped with-vertical-borders>
    <template #head>
      <component :is="tr" v-for="tr in content.headRows" :key="tr.key" />
    </template>

    <component :is="tr" v-for="tr in content.bodyRows" :key="tr.key" />
  </OnyxTable>
</template>
