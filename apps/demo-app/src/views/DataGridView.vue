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

type Entry = {
  id: number;
  name: string;
  age: number;
};

const enabledFeatures = ref({
  sorting: false,
  selection: false,
  filtering: false,
  moreActions: false,
});

const data: Entry[] = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 28 },
  { id: 3, name: "Mike Johnson", age: 35 },
  { id: 4, name: "Emily Davis", age: 25 },
  { id: 5, name: "Asperiks Kafelon", age: 99 },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enabled: DataGridFeature<Entry, TypeRenderMap<any>, any>[] = [];
  if (enabledFeatures.value.filtering) {
    enabled.push(DataGridFeatures.useFiltering());
  }
  if (enabledFeatures.value.sorting) {
    enabled.push(DataGridFeatures.useSorting<Entry>());
  }
  if (enabledFeatures.value.selection) {
    enabled.push(DataGridFeatures.useSelection<Entry>());
  }
  if (enabledFeatures.value.moreActions) {
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
        <OnyxSwitch
          v-for="(_, feature) in enabledFeatures"
          :key="feature"
          v-model="enabledFeatures[feature]"
          :label="`Enable ${feature}`"
        />
      </section>

      <OnyxDataGrid :features="dataFeatures" :data :columns="['name', 'age']" />
    </div>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.data-grid-settings {
  margin: var(--onyx-grid-gutter) 0;
  display: flex;
}
</style>
