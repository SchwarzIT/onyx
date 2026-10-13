<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Doughnut } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"doughnut"> = {
  labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
  datasets: [
    {
      data: [40, 20, 80, 10],
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false, // allow chart to stretch/shrink dynamically
};
</script>

<template>
  <div class="chart">
    <Doughnut :data :options />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 24rem;
}
</style>
