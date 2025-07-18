<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { PolarArea } from "vue-chartjs";
import { chartOptionsWithoutScales } from "../data.js";

const chartData: ChartData<"polarArea"> = {
  labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7"],
  datasets: [
    {
      label: "Dataset A",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: "Dataset B",
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};
</script>

<template>
  <div>
    <PolarArea :data="chartData" :options="chartOptionsWithoutScales" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 24rem;
}
</style>
