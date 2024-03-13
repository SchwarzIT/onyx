<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { Chart, registerables, type ChartData, type ChartOptions } from "chart.js";
import { PolarArea } from "vue-chartjs";

Chart.register(...registerables);
registerOnyxPlugin(Chart);

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

const chartOptions: ChartOptions<"polarArea"> = {
  responsive: true,
  hover: {
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: "Example title",
    },
    tooltip: {
      intersect: false,
    },
  },
};
</script>

<template>
  <div class="chart">
    <PolarArea :data="chartData" :options="chartOptions" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
