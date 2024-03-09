<script lang="ts" setup>
import { type ChartData, type ChartOptions } from "chart.js";
import { computed } from "vue";
import { Line } from "vue-chartjs";

export type ChartItem = {
  label: string;
  value: number;
  /** Can be set to change label inside the tooltip. If not set, `label` will be used. */
  tooltipLabel?: string;
};

const props = defineProps<{
  items: ChartItem[];
  xScaleLabel: string;
  yScaleLabel: string;
}>();

const chartData = computed<ChartData<"line">>(() => {
  return {
    labels: props.items.map((item) => item.label),
    datasets: [
      {
        data: props.items.map((item) => item.value),
        label: "Label",
        tension: 0.4,
        fill: true,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<"line">>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: props.xScaleLabel,
        },
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        title: {
          display: true,
          text: props.yScaleLabel,
        },
        grid: {
          lineWidth: (context) => (context.tick.value == 0 ? 3 : 1),
        },
      },
    },
    hover: {
      intersect: false,
    },
    plugins: {
      tooltip: {
        intersect: false,
        callbacks: {
          label: (item) => {
            const chartItem = props.items[item.dataIndex];
            return chartItem?.tooltipLabel ?? item.label;
          },
        },
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
