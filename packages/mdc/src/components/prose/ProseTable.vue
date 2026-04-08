<script lang="ts" setup>
import { OnyxTable } from "sit-onyx";
import { provide, useTemplateRef } from "vue";
import { PROSE_TABLE_INJECTION_KEY } from "./utils.js";

defineSlots<{
  default(): unknown;
}>();

const headRef = useTemplateRef("head");
const bodyRef = useTemplateRef("body");

provide(PROSE_TABLE_INJECTION_KEY, { headRef, bodyRef });
</script>

<!-- eslint-disable vue/no-useless-template-attributes -- false positive, the "refs" on the `<template>` tags are used as teleport targets -->
<template>
  <OnyxTable class="table" striped with-vertical-borders>
    <template #head ref="head"> </template>

    <template #default ref="body">
      <!--
        Placing the `<slot>` here will cause the thead and tbody element inside of it to render.
        Since we are use `ProseThead` and `ProseTbody`, the content will be teleported to correct slot in this table.
      -->
      <slot></slot>
    </template>
  </OnyxTable>
</template>

<style lang="scss" scoped>
.table {
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
