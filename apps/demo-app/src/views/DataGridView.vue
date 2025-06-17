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
  type ColumnConfig,
  type ColumnGroupConfig,
  type DataGridFeature,
} from "sit-onyx";
import { computed, h, ref } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  job: string;
};

const enabledFeatures = ref({
  sorting: false,
  selection: false,
  filtering: false,
  moreActions: false,
  hideColumns: false,
  stickyColumns: false,
  resize: false,
  skeleton: false,
  pagination: false,
});

const data: Entry[] = [
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

const columns: ColumnConfig<Entry, ColumnGroupConfig, never>[] = [
  "name",
  "age",
  "country",
  "city",
  "street",
  "houseNumber",
  "job",
];

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
  const enabled: DataGridFeature<Entry>[] = [];
  if (enabledFeatures.value.filtering) {
    enabled.push(DataGridFeatures.useFiltering());
  }
  if (enabledFeatures.value.sorting) {
    enabled.push(DataGridFeatures.useSorting<Entry>());
  }
  if (enabledFeatures.value.selection) {
    enabled.push(DataGridFeatures.useSelection<Entry>());
  }
  if (enabledFeatures.value.hideColumns) {
    enabled.push(DataGridFeatures.useHideColumns<Entry>());
  }
  if (enabledFeatures.value.stickyColumns) {
    enabled.push(DataGridFeatures.useStickyColumns<Entry>({ columns: ["name"] }));
  }
  if (enabledFeatures.value.resize) {
    enabled.push(DataGridFeatures.useResizing<Entry>());
  }
  if (enabledFeatures.value.pagination) {
    enabled.push(DataGridFeatures.usePagination({ pageSize: 2 }));
  }
  if (enabledFeatures.value.moreActions) {
    enabled.push(dummyFeature);
  }

  return enabled;
});
</script>

<template>
  <OnyxPageLayout>
    <OnyxHeadline is="h1">Data-Grid example</OnyxHeadline>

    <section class="data-grid-settings">
      <OnyxSwitch
        v-for="(_, feature) in enabledFeatures"
        :key="feature"
        v-model="enabledFeatures[feature]"
        :label="feature"
      />
    </section>

    <OnyxDataGrid :skeleton="enabledFeatures.skeleton" :features="dataFeatures" :data :columns />
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.data-grid-settings {
  margin: var(--onyx-grid-gutter) 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--onyx-density-xs);
}
</style>
