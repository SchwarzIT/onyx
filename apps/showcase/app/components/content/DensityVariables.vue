<script lang="ts" setup>
import { capitalize } from "@sit-onyx/icons/utils";
import { DENSITIES, type Density } from "sit-onyx";

const densityVariables = [
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

const spacingVariables = [
  "var(--onyx-spacing-5xs)",
  "var(--onyx-spacing-4xs)",
  "var(--onyx-spacing-3xs)",
  "var(--onyx-spacing-2xs)",
  "var(--onyx-spacing-xs)",
  "var(--onyx-spacing-sm)",
  "var(--onyx-spacing-md)",
  "var(--onyx-spacing-lg)",
  "var(--onyx-spacing-xl)",
  "var(--onyx-spacing-2xl)",
  "var(--onyx-spacing-3xl)",
  "var(--onyx-spacing-4xl)",
];

const selectedTab = ref<Density | "fixed">("default");

const densityClass = computed(() => {
  if (selectedTab.value === "fixed") return;
  return `onyx-density-${selectedTab.value}`;
});
</script>

<template>
  <div class="variables">
    <OnyxTabs v-model="selectedTab" class="tabs" label="Densities" size="h3">
      <OnyxTab
        v-for="density in [...DENSITIES, 'fixed']"
        :key="density"
        :value="density"
        :label="capitalize(density)"
      />
    </OnyxTabs>

    <OnyxInfoCard v-if="selectedTab === 'fixed'" headline="Fixed spacings" color="warning">
      You are currently viewing our <b>fixed</b> spacing variables. Mostly, we recommend to
      <b>use density-based variables</b> (compact, default or cozy) instead since they adapt
      automatically to the application density which provides more flexibility and customization.
      Even if your application does currently only use the "default" density, we recommend to still
      use the density variables. Use fixed spacings only if needed explicitly.
    </OnyxInfoCard>

    <CssVariablesTable :variables="selectedTab === 'fixed' ? spacingVariables : densityVariables">
      <template #preview="{ variable }">
        <VariablePreviewHeight :class="densityClass" :variable />
      </template>

      <template #reference="{ ref }">
        <!-- we need a reference to an element with the currently selected density so the variable values can be determined -->
        <div :ref :class="densityClass"></div>
      </template>
    </CssVariablesTable>
  </div>
</template>

<style lang="scss" scoped>
.variables {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-md);
}

.tabs {
  --onyx-tabs-tablist-margin-bottom: 0;
}
</style>
