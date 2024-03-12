<script lang="ts" setup>
import type { ChartData, ChartOptions } from "chart.js";
import type { OnyxColor } from "sit-onyx/types";
import { computed } from "vue";
import { Line } from "vue-chartjs";

const props = defineProps<{
  color?: OnyxColor;
}>();

const items = [
  { label: "01.01.2024", value: 19.99 },
  { label: "01.02.2024", value: -42 },
  { label: "01.03.2024", value: 39.98 },
  { label: "01.04.2024", value: 59.97 },
  { label: "01.05.2024", value: 42 },
];

const chartData: ChartData<"line"> = {
  labels: items.map((item) => item.label),
  datasets: [
    {
      data: items.map((item) => item.value),
      label: "Label",
      fill: true,
    },
  ],
};

const chartOptions = computed<ChartOptions<"line">>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "x scale label",
        },
      },
      y: {
        title: {
          display: true,
          text: "y scale label",
        },
      },
    },
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
      onyx: {
        color: props.color,
      },
    },
  };
});
</script>

<template>
  <Line :data="chartData" :options="chartOptions" class="chart" />
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
