<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Pie } from "vue-chartjs";
import { chartOptions } from "../data";

const chartData: ChartData<"pie"> = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      data: [40, 20, 80, 10],
    },
  ],
};
</script>

<template>
  <Pie :data="chartData" :options="chartOptions" class="chart" />
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
