<script setup lang="ts">
import { getCSSVariableValue } from "@sit-onyx/chartjs-plugin";
import { type Density } from "sit-onyx";
import type { ComponentPublicInstance, VNodeRef } from "vue";

const props = defineProps<{
  /**
   * List of available CSS variables (including `var()`).
   */
  variables: string[];
}>();

const slots = defineSlots<{
  /**
   * Preview of a given variable.
   */
  preview(props: { variable: string }): unknown;
  /**
   * If the variables are dynamic, the reference should be an element that applies the dynamic
   * values so the computed CSS resolves to the correct value (e.g. density etc.)
   */
  reference?(props: { ref: VNodeRef }): unknown;
}>();

const previewRef = ref<Element | ComponentPublicInstance | null>();

const getVariableValue = computed(() => {
  const element = previewRef.value instanceof HTMLElement ? previewRef.value : undefined;

  return (variable: string) => {
    const variableName = getCssVariableName(variable);
    const value = variableName ? getCSSVariableValue(variableName, element) : undefined;
    return value || "-";
  };
});

const selectedDensity = ref<Density>("default");
</script>

<template>
  <div>
    <OnyxTable class="table" striped>
      <template #head>
        <tr>
          <th>Variable name</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>
      </template>

      <tr v-for="variable in props.variables" :key="variable">
        <td>
          <div class="table__variable">
            <OnyxTag :label="variable" />
            <CopyButton :value="variable" />
          </div>
        </td>

        <td>
          <ClientOnly>
            <span :key="selectedDensity" class="onyx-text--mono">
              {{ getVariableValue(variable) }}
            </span>
          </ClientOnly>
        </td>

        <td>
          <slot name="preview" :variable></slot>
        </td>
      </tr>
    </OnyxTable>

    <!-- we need a reference to an element with the currently selected density so the variable values can be determined -->
    <div v-if="slots.reference" v-show="false">
      <slot :ref="(el) => (previewRef = el)" name="reference"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table {
  :deep(.onyx-table) {
    table-layout: fixed;
  }

  &__variable {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
  }
}
</style>
