<script setup lang="ts">
import { DateValue, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  date: DateValue;
  datetime: DateValue;
  time: DateValue;
  timestamp: DateValue;
  custom: DateValue;
};

const data = computed<Entry[]>(() => {
  return [
    {
      id: 1,
      date: new Date(),
      datetime: new Date(),
      time: new Date(),
      timestamp: new Date(),
      custom: new Date(),
    },
    {
      id: 2,
      date: new Date(),
      datetime: new Date(),
      time: new Date(),
      timestamp: new Date(),
      custom: new Date(),
    },
    {
      id: 3,
      date: new Date(),
      datetime: new Date(),
      time: new Date(),
      timestamp: new Date(),
      custom: new Date(),
    },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "date", label: "Date", type: "date" },
    { key: "datetime", label: "Datetime", type: "datetime-local" },
    { key: "time", label: "Time", type: "time" },
    { key: "timestamp", label: "Timestamp", type: "timestamp" },
    {
      key: "custom",
      label: "Custom format",
      type: {
        name: "date",
        options: {
          format: {
            dateStyle: "short",
          },
        },
      },
    },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
