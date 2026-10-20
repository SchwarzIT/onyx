<script lang="ts" setup>
import { capitalize } from "@sit-onyx/icons/utils";
import { DENSITIES, type Density } from "sit-onyx";

const variables = [
  "var(--onyx-density-3xs)",
  "var(--onyx-density-2xs)",
  "var(--onyx-density-xs)",
  "var(--onyx-density-sm)",
  "var(--onyx-density-md)",
  "var(--onyx-density-lg)",
  "var(--onyx-density-xl)",
  "var(--onyx-density-2xl)",
  "var(--onyx-density-3xl)",
  "var(--onyx-density-4xl)",
];

const selectedDensity = ref<Density>("default");
</script>

<template>
  <div>
    <OnyxTabs v-model="selectedDensity" class="tabs" label="Densities" size="h3">
      <OnyxTab
        v-for="density in DENSITIES"
        :key="density"
        :value="density"
        :label="capitalize(density)"
      />
    </OnyxTabs>

    <CssVariablesTable :variables>
      <template #preview="{ variable }">
        <VariablePreviewHeight :class="`onyx-density-${selectedDensity}`" :variable />
      </template>

      <template #reference="{ ref }">
        <!-- we need a reference to an element with the currently selected density so the variable values can be determined -->
        <div :ref :class="`onyx-density-${selectedDensity}`"></div>
      </template>
    </CssVariablesTable>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  --onyx-tabs-tablist-margin-bottom: var(--onyx-density-xs);
}
</style>
