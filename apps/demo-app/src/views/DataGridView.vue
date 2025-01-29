<script setup lang="ts">
import sort from "@sit-onyx/icons/sort.svg?raw";
import {
  DataGridFeatures,
  OnyxDataGrid,
  OnyxHeadline,
  OnyxMenuItem,
  OnyxPageLayout,
  OnyxSwitch,
  OnyxSystemButton,
  createFeature,
} from "sit-onyx";
import { computed, h, ref } from "vue";

const sortingEnabled = ref(false);
const moreActions = ref(false);

const data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 28 },
  { id: 3, name: "Mike Johnson", age: 35 },
  { id: 4, name: "Emily Davis", age: 25 },
  { id: 5, name: "Asperiks Kafelon", age: 99 },
];

type Entry = (typeof data)[number];

const dummyFeature = createFeature(() => ({
  name: Symbol("More actions"),
  watch: [],
  header: {
    actions: () => [
      {
        iconComponent: h(OnyxSystemButton, {
          label: "Column options",
          icon: sort,
          color: "medium",
        }),
        menuItems: [h(OnyxMenuItem, () => "Pin column"), h(OnyxMenuItem, () => "Unpin column")],
      },
      {
        iconComponent: h(OnyxSystemButton, {
          label: "Column options",
          icon: sort,
          color: "medium",
        }),
        menuItems: [h(OnyxMenuItem, () => "Remove column")],
      },
    ],
  },
}));

const dataFeatures = computed(() => {
  const enabled = [];
  if (sortingEnabled.value) {
    enabled.push(DataGridFeatures.useSorting<Entry>());
  }

  if (moreActions.value) {
    enabled.push(dummyFeature());
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
        <OnyxSwitch v-model="moreActions" label="Enable more actions" />
      </section>
      <OnyxDataGrid :features="dataFeatures" :data :columns="['name', 'age']" />
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.data-grid-settings {
  margin: 1rem 0;
  display: flex;
}
</style>
