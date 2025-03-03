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
  type DataGridFeature,
  type TypeRenderMap,
} from "sit-onyx";
import { computed, h, ref } from "vue";

const sortingEnabled = ref(false);
const selectionEnabled = ref(false);
const filteringEnabled = ref(false);
const stickyColumnsEnabled = ref(false);
const moreActions = ref(false);

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    country: "USA",
    city: "New York",
    street: "5th Avenue",
    houseNumber: "10A",
    job: "Software Engineer",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    country: "UK",
    city: "London",
    street: "Baker Street",
    houseNumber: "221B",
    job: "Doctor",
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 35,
    country: "Canada",
    city: "Toronto",
    street: "Queen Street",
    houseNumber: "15",
    job: "Architect",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 25,
    country: "Australia",
    city: "Sydney",
    street: "George Street",
    houseNumber: "42",
    job: "Graphic Designer",
  },
  {
    id: 5,
    name: "Asperiks Kafelon",
    age: 99,
    country: "USA",
    city: "San Francisco",
    street: "Fulton Street",
    houseNumber: "7C",
    job: "Dentist",
  },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enabled: DataGridFeature<Entry, TypeRenderMap<any>, any>[] = [];
  if (filteringEnabled.value) {
    enabled.push(DataGridFeatures.useFiltering());
  }
  if (sortingEnabled.value) {
    enabled.push(DataGridFeatures.useSorting<Entry>());
  }
  if (selectionEnabled.value) {
    enabled.push(DataGridFeatures.useSelection<Entry>());
  }
  if (stickyColumnsEnabled.value) {
    enabled.push(DataGridFeatures.useStickyColumns({ columns: ["name"] }));
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
        <OnyxSwitch v-model="filteringEnabled" label="Enable filtering" />
        <OnyxSwitch v-model="sortingEnabled" label="Enable sorting" />
        <OnyxSwitch v-model="selectionEnabled" label="Enable selection" />
        <OnyxSwitch v-model="stickyColumnsEnabled" label="Enable stickyColumns" />
        <OnyxSwitch v-model="moreActions" label="Enable more actions" />
      </section>
      <OnyxDataGrid
        :features="dataFeatures"
        :data
        :columns="['name', 'age', 'country', 'city', 'street', 'houseNumber', 'job']"
      />
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.data-grid-settings {
  margin: 1rem 0;
  display: flex;
}
</style>
