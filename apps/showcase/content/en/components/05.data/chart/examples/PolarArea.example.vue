<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { PolarArea } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"polarArea"> = {
  labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7"],
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

const options: ChartOptions<"polarArea"> = {
  responsive: true,
  maintainAspectRatio: false, // allow chart to stretch/shrink dynamically
};
</script>

<template>
  <div class="chart">
    <PolarArea :data :options />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 24rem;
}
</style>
