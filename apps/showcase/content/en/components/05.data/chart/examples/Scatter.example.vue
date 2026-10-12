<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Scatter } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"scatter"> = {
  datasets: [
    {
      label: "Dataset A",
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

const options: ChartOptions<"scatter"> = {
  responsive: true,
  maintainAspectRatio: false, // allow chart to stretch/shrink dynamically
};
</script>

<template>
  <div class="chart">
    <Scatter :data :options />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 24rem;
}
</style>
