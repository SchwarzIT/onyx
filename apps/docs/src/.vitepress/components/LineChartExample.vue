<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { Chart, registerables, type ChartData, type ChartOptions } from "chart.js";
import { ONYX_COLORS, type OnyxColor } from "sit-onyx";
import { computed, ref } from "vue";
import { Line } from "vue-chartjs";

Chart.register(...registerables);
registerOnyxPlugin(Chart);

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

const onyxColor = ref<OnyxColor>("primary");

const chartOptions = computed<ChartOptions<"line">>(() => {
  return {
    responsive: true,
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
    },
  };
});
</script>

<template>
  <div>
    <label>
      Select chart color:
      <select v-model="onyxColor" class="color-select">
        <option v-for="color in ONYX_COLORS" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
    </label>

    <Line :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}

.color-select {
  background-color: transparent;
  padding: 0 var(--onyx-spacing-md);
  text-align: center;
  margin-left: var(--onyx-spacing-md);
  cursor: pointer;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
}
</style>
