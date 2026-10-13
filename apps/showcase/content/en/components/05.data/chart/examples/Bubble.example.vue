<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Bubble } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"bubble"> = {
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

const options: ChartOptions<"bubble"> = {
  responsive: true,
  maintainAspectRatio: false, // allow chart to stretch/shrink dynamically
};
</script>

<template>
  <div class="chart">
    <Bubble :data :options />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 24rem;
}
</style>
