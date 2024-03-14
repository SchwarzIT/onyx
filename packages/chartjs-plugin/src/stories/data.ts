import type { ChartOptions } from "chart.js";

/**
 * Shared chart options for all example charts (without scales for polar area and radar chart).
 */
export const chartOptionsWithoutScales = {
  maintainAspectRatio: false, // needed to allow setting the actual chart height via CSS
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
} satisfies ChartOptions;

/**
 * Shared chart options for all example charts.
 */
export const chartOptions = {
  ...chartOptionsWithoutScales,
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
} satisfies ChartOptions;
