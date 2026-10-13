<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Line } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"line"> = {
  labels: ["01.01.2024", "01.02.2024", "01.03.2024", "01.04.2024", "01.05.2024"],
  datasets: [
    {
      label: "Dataset A",
      data: [1, 8, 4, 6, 2],
      // fill: true,
    },
    {
      label: "Dataset B",
      data: [4, 2, 3, 1, 7],
      // fill: true,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false, // allow chart to stretch/shrink dynamically
};
</script>

<template>
  <div class="chart">
    <Line :data :options />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 24rem;
}
</style>
