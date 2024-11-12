<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, OnyxHeadline, OnyxPageLayout, OnyxSwitch } from "sit-onyx";
import { computed, ref } from "vue";

const sortingEnabled = ref(false);

const data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 28 },
  { id: 3, name: "Mike Johnson", age: 35 },
  { id: 4, name: "Emily Davis", age: 25 },
  { id: 5, name: "Asperiks Kafelon", age: 99 },
];

const features = computed(() => {
  const enabled = [];
  if (sortingEnabled.value) {
    enabled.push(DataGridFeatures.useSorting());
  }
  return enabled;
});
</script>

<template>
  <OnyxPageLayout>
    <div class="onyx-grid-container">
      <OnyxHeadline is="h1">Data-Grid example</OnyxHeadline>
      <section class="data-grid-settings">
        <OnyxSwitch v-model="sortingEnabled" label="Enable sorting" />
      </section>
      <OnyxDataGrid :features :data :columns="['name', 'age']" />
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.data-grid-settings {
  margin: 1rem 0;
  display: flex;
}
</style>
