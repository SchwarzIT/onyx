<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Pie } from "vue-chartjs";
import { chartOptions } from "../data.js";

const chartData: ChartData<"pie"> = {
  labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
  datasets: [{ data: [40, 20, 80, 10] }],
};
</script>

<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 24rem;
}
</style>
