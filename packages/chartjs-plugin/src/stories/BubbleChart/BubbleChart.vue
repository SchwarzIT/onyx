<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Bubble } from "vue-chartjs";
import { chartOptions } from "../data.js";

const chartData: ChartData<"bubble"> = {
  datasets: [
    {
      label: "Dataset A",
      data: [
        { x: 20, y: 25, r: 5 },
        { x: 40, y: 10, r: 10 },
        { x: 30, y: 22, r: 30 },
      ],
    },
    {
      label: "Dataset B",
      data: [
        { x: 10, y: 30, r: 15 },
        { x: 20, y: 20, r: 10 },
        { x: 15, y: 8, r: 30 },
      ],
    },
  ],
};
</script>

<template>
  <div>
    <Bubble :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 24rem;
}
</style>
