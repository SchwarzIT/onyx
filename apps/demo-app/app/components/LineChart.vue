<script lang="ts" setup>
import { getDatasetColors } from "@sit-onyx/chartjs-plugin";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "vue-chartjs";

const { t } = useI18n();

const data = computed<ChartData<"line">>(() => {
  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"],
    datasets: [
      {
        label: t("charts.metrics.revenue"),
        data: [5, 15, 22, 40, 15, 30],
        fill: true,
        tension: 0.4,
        ...getDatasetColors("quantitatives-700"),
      },
      {
        label: t("charts.metrics.netProfit"),
        data: [25, 10, 13, 25, 30, 15],
        fill: true,
        tension: 0.4,
        ...getDatasetColors("primary"),
      },
      {
        label: t("charts.metrics.investments"),
        data: [20, 48, 25, 26, 5, 42],
        fill: true,
        tension: 0.4,
        ...getDatasetColors("quantitatives-1100"),
      },
    ],
  };
});

const options: ChartOptions<"line"> = { maintainAspectRatio: false };
</script>

<template>
  <div class="chart">
    <ClientOnly>
      <Line :data :options />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 50%;
  flex-grow: 1;
}
</style>
