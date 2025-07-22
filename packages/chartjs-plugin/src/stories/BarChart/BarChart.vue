<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Bar } from "vue-chartjs";
import { chartOptions } from "../data.js";

const labels = ["01.01.2024", "01.02.2024", "01.03.2024", "01.04.2024", "01.05.2024"];

const chartData: ChartData<"bar"> = {
  labels,
  datasets: [
    {
      label: "Dataset A",
      data: [1, 8, 4, 6, 2],
      borderWidth: 2,
    },
    {
      label: "Dataset B",
      data: [4, 2, 3, 1, 7],
      borderWidth: 2,
    },
  ],
};
</script>

<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 24rem;
}
</style>
