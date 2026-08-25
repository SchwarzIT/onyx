<script setup lang="ts">
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
import { postPluginMessage } from "./composables/usePluginMessage.js";
import type { GenerateDataGridPayload } from "./types/index.js";

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
  columns: [],
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
      </div>

      <template #footer>
        <OnyxBottomBar>
          <OnyxButton
            label="Generate data grid"
            type="submit"
            :loading="isLoading"
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
