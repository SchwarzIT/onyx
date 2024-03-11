import type { ChartDataset, ChartType, Plugin, ScaleOptions } from "chart.js";
import type { OnyxChartOptions } from "./types";
import { getCSSVariableValue, hexToRgb } from "./utils";

export const plugin: Plugin<ChartType, OnyxChartOptions> = {
  id: "onyx",
  defaults: {
    color: "primary",
  },
  beforeUpdate: (chart, args, options) => {
    const plugins = chart.options.plugins ?? {};

    // style default Chart.js plugins (tooltips, legend etc.)
    if (plugins.tooltip) {
      const invertedTextColor = getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
      plugins.tooltip.titleColor = invertedTextColor;
      plugins.tooltip.bodyColor = invertedTextColor;
      plugins.tooltip.backgroundColor = getCSSVariableValue("--onyx-color-base-neutral-900");
    }

    if (plugins.legend?.labels) {
      plugins.legend.labels.color = getCSSVariableValue("--onyx-color-text-icons-neutral-medium");
    }

    if (plugins.title) {
      plugins.title.color = getCSSVariableValue("--onyx-color-text-icons-neutral-intense");
    }

    const primaryColor = getCSSVariableValue(`--onyx-color-base-${options.color}-500`);
    const backgroundColor = hexToRgb(primaryColor);

    // style each available dataset
    chart.config.data.datasets.forEach((dataset) => {
      // generic styles (apply to all chart types)
      if (!dataset.borderColor) {
        dataset.borderColor = primaryColor;
      }
      if (!dataset.backgroundColor) {
        dataset.backgroundColor = `rgba(${backgroundColor}, 0.3)`;
      }

      // special styles depending on the chart type
      if (!("type" in chart.config)) return;
      if (chart.config.type === "line") styleLineDataset(dataset as ChartDataset<"line">);
    });

    if (!chart.config.options) chart.config.options = {};

    Object.values(chart.config.options.scales ?? {}).forEach((scale) => {
      if (!scale) return;
      styleScale(scale);
    });
  },
  /**
   * Update chart whenever the light/dark mode changes so that the colors are updated
   */
  afterInit: (chart) => {
    const darkModeObserver = new MutationObserver((mutations) => {
      const oldClasses = mutations[0].oldValue ?? "";
      const newClasses = (mutations[0].target as HTMLElement).className;

      const oldTheme = oldClasses.includes("dark") ? "dark" : "light";
      const newTheme = newClasses.includes("dark") ? "dark" : "light";

      // update chart so the colors are updated to light/dark mode
      if (oldTheme !== newTheme) chart.update();
    });

    const observerOptions: MutationObserverInit = {
      attributeFilter: ["class"],
      attributeOldValue: true,
    };

    darkModeObserver.observe(document.body, observerOptions);
    darkModeObserver.observe(document.documentElement, observerOptions);
  },
};

/**
 * Styles the given scale (e.g. x or y). Sets the grid, tickets and title font styles.
 */
const styleScale = (scale: ScaleOptions & { title?: ScaleOptions<"linear">["title"] }) => {
  const fontFamily = getCSSVariableValue("--onyx-font-family");

  scale.grid = {
    ...scale.grid,
    color: getCSSVariableValue("--onyx-color-base-neutral-300"),
  };
  scale.ticks = {
    ...scale.ticks,
    color: getCSSVariableValue("--onyx-color-text-icons-neutral-medium"),
    font: {
      family: fontFamily,
      size: 13,
    },
  };

  scale.title = {
    ...scale.title,
    color: getCSSVariableValue("--onyx-color-text-icons-neutral-soft"),
    font: {
      family: fontFamily,
      size: 16,
    },
  };
};

const styleLineDataset = (data: ChartDataset<"line">) => {
  if (!data.pointBorderColor) {
    data.pointBorderColor = getCSSVariableValue("--onyx-color-base-neutral-700");
  }
  if (!data.pointBackgroundColor) {
    data.pointBackgroundColor = getCSSVariableValue("--onyx-color-base-neutral-100");
  }
};
