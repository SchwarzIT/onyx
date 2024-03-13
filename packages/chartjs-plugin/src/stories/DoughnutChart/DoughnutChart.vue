<script lang="ts" setup>
import type { ChartData } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { chartOptions } from "../data";

const chartData: ChartData<"doughnut"> = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      data: [40, 20, 80, 10],
    },
  ],
};
</script>

<template>
  <Doughnut :data="chartData" :options="chartOptions" class="chart" />
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
