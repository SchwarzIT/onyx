<script lang="ts" setup>
import OnyxTable from "../../OnyxTable/OnyxTable.vue";
import type { OnyxDataGridRendererProps } from "./types";

const props = defineProps<OnyxDataGridRendererProps>();
</script>

<template>
  <OnyxTable class="onyx-data-grid" v-bind="props">
    <template #head>
      <tr>
        <th>Head</th>
      </tr>
    </template>

    <tr>
      <td>Cell 1</td>
    </tr>
  </OnyxTable>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

.onyx-data-grid {
  @include layers.component() {
  }
}
</style>
