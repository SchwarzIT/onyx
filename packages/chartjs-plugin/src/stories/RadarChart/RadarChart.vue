<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Radar } from "vue-chartjs";
import { chartOptionsWithoutScales } from "../data.js";

const chartData: ChartData<"radar"> = {
  labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
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
    <Radar :data="chartData" :options="chartOptionsWithoutScales" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 24rem;
}
</style>
