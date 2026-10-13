<script lang="ts" setup>
import { getDatasetColors, registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Bar } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const exampleData = [
  { color: "primary", value: 88 },
  { color: "neutral", value: 74 },
  { color: "danger", value: 92 },
  { color: "warning", value: 65 },
  { color: "success", value: 78 },
  { color: "info", value: 85 },
  { color: "quantitatives-100", value: 95 },
  { color: "quantitatives-200", value: 70 },
  { color: "quantitatives-300", value: 82 },
  { color: "quantitatives-400", value: 60 },
  { color: "quantitatives-500", value: 89 },
  { color: "quantitatives-600", value: 94 },
  { color: "quantitatives-700", value: 76 },
  { color: "quantitatives-800", value: 83 },
  { color: "quantitatives-900", value: 91 },
  { color: "quantitatives-1000", value: 68 },
  { color: "quantitatives-1100", value: 84 },
  { color: "quantitatives-1200", value: 79 },
] as const;

const data: ChartData<"bar"> = {
  labels: exampleData.map((data) => data.color),
  datasets: [
    {
      data: exampleData.map((data) => data.value),
      borderWidth: 2,
      backgroundColor: exampleData.map((color) => getDatasetColors(color.color).backgroundColor()),
      borderColor: exampleData.map((color) => getDatasetColors(color.color).borderColor()),
    },
  ],
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false, // allow chart to stretch/shrink dynamically
  indexAxis: "y", // horizontal bars
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <div class="chart">
    <Bar :data :options />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 42rem;
}
</style>
