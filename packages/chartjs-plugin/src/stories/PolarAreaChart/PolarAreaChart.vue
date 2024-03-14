<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { PolarArea } from "vue-chartjs";
import { chartOptionsWithoutScales } from "../data";

const chartData: ChartData<"polarArea"> = {
  labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: "My Second dataset",
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};
</script>

<template>
  <PolarArea :data="chartData" :options="chartOptionsWithoutScales" class="chart" />
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
