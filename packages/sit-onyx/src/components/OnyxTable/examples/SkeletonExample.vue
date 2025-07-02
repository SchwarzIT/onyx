<script lang="ts" setup>
import { ref } from "vue";
import { OnyxSkeleton, OnyxSwitch, OnyxTable } from "../../../index.js";

const skeleton = ref(true); // Skeleton state

const fruits = [
  { name: "Strawberry", price: "4.50", inventoryKg: "200", inventoryPieces: "100", rating: "5" },
  { name: "Apple", price: "1.99", inventoryKg: "3000", inventoryPieces: "200", rating: "3" },
  { name: "Banana", price: "3.75", inventoryKg: "18000", inventoryPieces: "300", rating: "4" },
];
</script>

<template>
  <OnyxSwitch v-model="skeleton" label="Toggle Skeleton Mode" />
  <OnyxTable class="table" :class="{ 'table--skeleton': skeleton }">
    <template #head>
      <tr>
        <th scope="col">Fruit</th>
        <th scope="col">Price (€/kg)</th>
        <th scope="col">Inventory (kg)</th>
        <th scope="col">Inventory (pieces)</th>
        <th scope="col">Rating</th>
      </tr>
    </template>

    <tr v-for="(fruit, rowIndex) in fruits" :key="rowIndex">
      <td v-for="(cell, cellIndex) in fruit" :key="cellIndex">
        <OnyxSkeleton v-if="skeleton" />
        <template v-else>{{ cell }}</template>
      </td>
    </tr>
  </OnyxTable>
</template>

<style lang="scss" scoped>
.table {
  &--skeleton {
    // hover effects and other interactions should be disabled when in skeleton mode
    pointer-events: none;
  }
}
</style>
