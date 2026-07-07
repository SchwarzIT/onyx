<script setup lang="ts">
import { iconPlus } from "@sit-onyx/icons";
import { OnyxButton, OnyxDataGrid, OnyxEmpty, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = computed<Entry[]>(() => {
  return [];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data>
    <template #empty="{ defaultMessage }">
      <OnyxEmpty>
        <!-- re-use the default message here or place a custom message -->
        {{ defaultMessage }}

        <template #description>This is an example description.</template>

        <template #buttons>
          <OnyxButton label="Go back" color="neutral" mode="plain" />
          <OnyxButton label="Add data" :icon="iconPlus" />
        </template>
      </OnyxEmpty>
    </template>
  </OnyxDataGrid>
</template>
