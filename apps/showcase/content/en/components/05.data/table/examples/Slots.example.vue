<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxButton, OnyxHeadline, OnyxIconButton, OnyxPagination, OnyxTable } from "sit-onyx";
import { ref } from "vue";

const data = [
  { fruit: "Strawberry", price: 4.5, weight: 200, quantity: 100, rating: 5 },
  { fruit: "Apple", price: 1.99, weight: 3_000, quantity: 200, rating: 3 },
  { fruit: "Banana", price: 3.75, weight: 18_000, quantity: 300, rating: 4 },
];

const page = ref(1);
</script>

<template>
  <OnyxTable>
    <template #head>
      <tr>
        <th>Fruit</th>
        <th>Price (€/kg)</th>
        <th>Inventory (kg)</th>
        <th>Inventory (pieces)</th>
        <th>Rating</th>
      </tr>
    </template>

    <tr v-for="row in data" :key="row.fruit">
      <td>{{ row.fruit }}</td>
      <td>{{ row.price }}</td>
      <td>{{ row.weight }}</td>
      <td>{{ row.quantity }}</td>
      <td>{{ row.rating }}</td>
    </tr>

    <template #headline>
      <OnyxHeadline is="h3">Example headline</OnyxHeadline>
    </template>

    <template #actions>
      <OnyxIconButton :icon="iconPlaceholder" label="Example action" />
      <OnyxButton label="Button" :icon="iconPlaceholder" />
    </template>

    <template #bottomLeft>
      <p class="onyx-text--small">Additional example description.</p>
    </template>

    <template #pagination>
      <OnyxPagination v-model="page" :pages="42" />
    </template>
  </OnyxTable>
</template>
