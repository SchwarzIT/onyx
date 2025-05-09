<script lang="ts" setup>
import OnyxDataGrid from "./OnyxDataGrid.vue";

const data = [
  {
    id: 1,
    date1: new Date("1990-01-01"),
    date2: new Date("1990-01-01"),
    date3: new Date("1990-01-01"),
    undefinedDate: undefined,
    number1: 12.34,
    number2: 12.34,
    number3: 12.34,
    undefinedNumber: undefined,
  },
];
</script>

<template>
  <OnyxDataGrid
    :data="data"
    :columns="[
      {
        key: 'date1',
        type: { name: 'date', options: { format: 'timestamp' } },
      },
      {
        key: 'date2',
        type: { name: 'date', options: { format: { dateStyle: 'full' } } },
      },
      {
        key: 'undefinedDate',
        type: { name: 'date', options: { fallback: '---' } },
      },
      {
        key: 'number1',
        type: { name: 'number', options: { format: 'decimal' } },
      },
      {
        key: 'number2',
        type: {
          name: 'number',
          options: {
            format: {
              notation: 'scientific',
              signDisplay: 'always',
              style: 'currency',
              currency: 'EUR',
            },
          },
        },
      },
      {
        key: 'undefinedNumber',
        type: { name: 'number', options: { fallback: 'NaN' } },
      },
    ]"
  />
</template>
