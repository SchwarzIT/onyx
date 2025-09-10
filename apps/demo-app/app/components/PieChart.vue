<script lang="ts" setup>
import { getDatasetColors } from "@sit-onyx/chartjs-plugin";
import type { ChartData, Color } from "chart.js";
import { Pie } from "vue-chartjs";

const { t } = useI18n();

type PieChartColor = Color[];

const data = computed<ChartData<"pie">>(() => {
  const colors = [
    getDatasetColors("quantitatives-1100"),
    getDatasetColors("quantitatives-700"),
    getDatasetColors("quantitatives-500"),
    getDatasetColors("quantitatives-1200"),
  ];

  return {
    labels: [
      t("charts.customerSegments.enterprise"),
      t("charts.customerSegments.mid-sized"),
      t("charts.customerSegments.small"),
      t("charts.customerSegments.private"),
    ],
    datasets: [
      {
        data: [55, 25, 15, 5],
        // using a getter function here so the colors are re-evaluated when switched to dark mode
        backgroundColor: (() =>
          colors.map(({ backgroundColor }) => backgroundColor())) as unknown as PieChartColor,
        borderColor: (() =>
          colors.map(({ borderColor }) => borderColor())) as unknown as PieChartColor,
      },
    ],
  };
});
</script>

<template>
  <div class="chart">
    <ClientOnly>
      <Pie :data :options="commonChartOptions" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 50%;
  flex-grow: 1;
}
</style>
