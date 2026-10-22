<script lang="ts" setup>
import { OnyxTable } from "sit-onyx";
</script>

<template>
  <OnyxTable>
    <template #head>
      <tr>
        <th>Head</th>
        <th>Head</th>
        <th>Head</th>
      </tr>
    </template>

    <tr v-for="i in 3" :key="i">
      <td>Item</td>
      <td>Item</td>
      <td>Item</td>
    </tr>
  </OnyxTable>
</template>

<style lang="scss" scoped>
.onyx-table-wrapper {
  width: 100%;
  zoom: 0.55;
}
</style>
