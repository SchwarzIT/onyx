<script lang="ts" setup>
import { ref } from "vue";
import OnyxSkeleton from "../../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTable from "../OnyxTable.vue";

const skeleton = ref(true); // Skeleton state

const fruits = [
  { name: "Strawberry", price: "4.50", inventoryKg: "200", inventoryPieces: "100", rating: "5" },
  { name: "Apple", price: "1.99", inventoryKg: "3000", inventoryPieces: "200", rating: "3" },
  { name: "Banana", price: "3.75", inventoryKg: "18000", inventoryPieces: "300", rating: "4" },
];
</script>

<template>
  <OnyxTable>
    <template #head>
      <tr>
        <th id="fruit">Fruit</th>
        <th id="price">Price (€/kg)</th>
        <th id="inventory_kg">Inventory (kg)</th>
        <th id="inventory_price">Inventory (pieces)</th>
        <th id="rating">Rating</th>
      </tr>
    </template>

    <tr v-for="(fruit, i) in fruits" :key="i">
      <td v-for="(cell, j) in fruit" :key="j">
        <OnyxSkeleton v-if="skeleton" />
        <template v-else>{{ cell }}</template>
      </td>
    </tr>
  </OnyxTable>
</template>
