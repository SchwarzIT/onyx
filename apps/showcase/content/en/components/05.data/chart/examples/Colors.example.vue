<script lang="ts" setup>
import { getDatasetColors, registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Bar } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const availableColors = [
  { label: "Primary", color: "primary", value: 88 },
  { label: "Neutral", color: "neutral", value: 74 },
  { label: "Danger", color: "danger", value: 92 },
  { label: "Warning", color: "warning", value: 65 },
  { label: "Success", color: "success", value: 78 },
  { label: "Info", color: "info", value: 85 },
  { label: "Quantitative 100", color: "quantitatives-100", value: 95 },
  { label: "Quantitative 200", color: "quantitatives-200", value: 70 },
  { label: "Quantitative 300", color: "quantitatives-300", value: 82 },
  { label: "Quantitative 400", color: "quantitatives-400", value: 60 },
  { label: "Quantitative 500", color: "quantitatives-500", value: 89 },
  { label: "Quantitative 600", color: "quantitatives-600", value: 94 },
  { label: "Quantitative 700", color: "quantitatives-700", value: 76 },
  { label: "Quantitative 800", color: "quantitatives-800", value: 83 },
  { label: "Quantitative 900", color: "quantitatives-900", value: 91 },
  { label: "Quantitative 1000", color: "quantitatives-1000", value: 68 },
  { label: "Quantitative 1100", color: "quantitatives-1100", value: 84 },
  { label: "Quantitative 1200", color: "quantitatives-1200", value: 79 },
] as const;

const data: ChartData<"bar"> = {
  labels: availableColors.map((color) => color.label),
  datasets: [
    {
      data: availableColors.map((color) => color.value),
      borderWidth: 2,
      backgroundColor: availableColors.map((color) =>
        getDatasetColors(color.color).backgroundColor(),
      ),
      borderColor: availableColors.map((color) => getDatasetColors(color.color).borderColor()),
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
