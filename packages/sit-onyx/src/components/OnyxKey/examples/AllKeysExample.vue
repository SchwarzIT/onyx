<script setup lang="ts">
import { computed, h, useTemplateRef } from "vue";
import type { OperatingSystem } from "../../../composables/useOperatingSystem.js";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxUnstableKey,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
  type TypeRenderMap,
} from "../../../index.js";
import {
  ALPHABETIC_KEYS,
  EDITING_KEYS,
  FUNCTION_KEYS,
  MEDIA_KEYS,
  MISC_KEYS,
  MODIFIER_KEYS,
  NAVIGATION_KEYS,
  NUMERIC_KEYS,
  NUMPAD_KEYS,
  SYMBOL_KEYS,
  type KeyboardKey,
} from "../../../utils/keyboard.js";

const detectedKey = useTemplateRef("keyRef");
const detectedOS = computed(() => detectedKey.value?.actualOS);

type Entry = {
  id: string;
  auto: string;
  macOS: string;
  windows: string;
  generic: string;
};

type CustomColumnTypes = ColumnTypesFromFeatures<typeof withCustomTypes>;

const columns = computed<ColumnConfig<Entry, ColumnGroupConfig, CustomColumnTypes>[]>(() => {
  return [
    { key: "id", label: "Key name", width: "max-content" },
    { key: "auto", label: `Auto detected (${detectedOS.value})`, type: "key" },
    { key: "macOS", label: "macOS", type: { name: "key", options: { os: "macOS" } } },
    { key: "windows", label: "Windows", type: { name: "key", options: { os: "windows" } } },
    { key: "generic", label: "Generic", type: { name: "key", options: { os: "generic" } } },
  ];
});

const data = [
  ALPHABETIC_KEYS,
  NUMERIC_KEYS,
  MODIFIER_KEYS,
  NAVIGATION_KEYS,
  SYMBOL_KEYS,
  NUMPAD_KEYS,
  FUNCTION_KEYS,
  MISC_KEYS,
  MEDIA_KEYS,
  EDITING_KEYS,
]
  .flat()
  .map<Entry>((key) => ({
    id: key,
    auto: key,
    macOS: key,
    windows: key,
    generic: key,
  }));

const withCustomTypes = createFeature(() => ({
  name: Symbol("example feature name"),
  typeRenderer: {
    // use the `createTypeRenderer` function to create a type renderer with custom column type options
    // all properties must be optional
    key: DataGridFeatures.createTypeRenderer<{ os?: OperatingSystem }, Entry>({
      cell: {
        component: ({ modelValue, metadata }) => {
          const os = metadata?.typeOptions?.os;
          return h(OnyxUnstableKey, { name: modelValue as KeyboardKey, os });
        },
      },
    }),
  } satisfies TypeRenderMap<Entry>,
}));

const withFiltering = DataGridFeatures.useFiltering<Entry>({
  enabled: false,
  columns: { id: { enabled: true } },
});

const withSorting = DataGridFeatures.useSorting<Entry>({
  enabled: false,
  columns: { id: { enabled: true } },
});

const withStickyColumns = DataGridFeatures.useStickyColumns<Entry>({
  columns: ["id"],
  position: "left",
});

const features = [withCustomTypes, withFiltering, withSorting, withStickyColumns];
</script>

<template>
  <div>
    <OnyxDataGrid class="data-grid" :columns :data :features />

    <!-- this key is only used to get the detected OS -->
    <OnyxUnstableKey v-show="false" ref="keyRef" name="A" />
  </div>
</template>

<style lang="scss" scoped>
.data-grid {
  max-height: 90vh;
}
</style>
