import type { ChartOptions } from "chart.js";

export const commonChartOptions = {
  maintainAspectRatio: false,
  hover: {
    intersect: false,
  },
  plugins: {
    tooltip: {
      intersect: false,
    },
  },
} satisfies ChartOptions;
