<script lang="ts" setup>
import { getDatasetColors } from "@sit-onyx/chartjs-plugin";
import type { ChartData, ChartOptions } from "chart.js";
import { Bar } from "vue-chartjs";

const { t } = useI18n();

const data = computed<ChartData<"bar">>(() => {
  return {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
    datasets: [
      {
        label: t("charts.productLines.a"),
        data: [40, 0, 20, 0, 35, 0],
        borderWidth: 1,
        ...getDatasetColors("info"),
      },
      {
        label: t("charts.productLines.b"),
        data: [-15, 45, -10, 0, 0, 25],
        borderWidth: 1,
        ...getDatasetColors("success"),
      },
      {
        label: t("charts.productLines.c"),
        data: [0, 0, 0, 50, 20, 0],
        borderWidth: 1,
        ...getDatasetColors("danger"),
      },
      {
        label: t("charts.productLines.d"),
        data: [15, -25, 10, -35, -10, -15],
        borderWidth: 1,
        ...getDatasetColors("warning"),
      },
    ],
  };
});

const options: ChartOptions<"bar"> = { maintainAspectRatio: false };
</script>

<template>
  <div class="chart">
    <ClientOnly>
      <Bar :data :options />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 50%;
  flex-grow: 1;
}
</style>
