<script setup lang="ts">
import { iconToolTable } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxBottomBar,
  OnyxButton,
  OnyxPageLayout,
  OnyxSegmentedControl,
  type OnyxSegmentedControlOption,
} from "sit-onyx";
import { ref } from "vue";
import ColumnsDataGrid from "./components/ColumnsDataGrid.vue";
import ExtraSection from "./components/sections/ExtraSection.vue";
import RowSection from "./components/sections/RowSection.vue";
import { postPluginMessage } from "./composables/usePluginMessage.js";
import type { GenerateDataGridPayload } from "./types/index.js";
import { getDefaultColumnDefinition } from "./utils/misc.js";

const isLoading = ref(false);

const handleGenerate = () => {
  isLoading.value = true;
  postPluginMessage({
    type: "generate-data-grid",
    data: {},
  });
};

const data = ref<GenerateDataGridPayload>({
  mode: "basic",
  columns: [getDefaultColumnDefinition()],
  rows: {
    count: 5,
    stroke: "grid",
    style: "striped",
  },
});

const modeOptions: OnyxSegmentedControlOption<GenerateDataGridPayload["mode"]>[] = [
  { label: "Basic", value: "basic" },
  { label: "Advanced", value: "advanced" },
];
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <div class="content onyx-density-compact">
        <OnyxSegmentedControl v-model="data.mode" :options="modeOptions" />

        <ColumnsDataGrid v-model="data.columns" />

        <RowSection v-model="data" />

        <ExtraSection v-if="data.mode === 'advanced'" v-model="data" />
      </div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton
            label="Generate data grid"
            type="submit"
            :loading="isLoading"
            :icon="iconToolTable"
            @click="handleGenerate"
          />
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}

:deep(.onyx-grid-layout) {
  padding-block: var(--onyx-grid-margin);
}
</style>
