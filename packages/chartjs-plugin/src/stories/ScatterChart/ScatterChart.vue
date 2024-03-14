<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Scatter } from "vue-chartjs";
import { chartOptions } from "../data";

const chartData: ChartData<"scatter"> = {
  datasets: [
    {
      label: "Dataset A",
      fill: false,
      data: [
        { x: -2, y: 4 },
        { x: -1, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
      ],
    },
    {
      label: "Dataset B",
      fill: false,
      data: [
        { x: -2, y: -4 },
        { x: -1, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: -1 },
        { x: 2, y: -4 },
      ],
    },
  ],
};
</script>

<template>
  <Scatter :data="chartData" :options="chartOptions" class="chart" />
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
