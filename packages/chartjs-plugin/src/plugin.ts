import type { ChartDataset, ChartType, Plugin, ScaleOptions } from "chart.js";
import type { OnyxChartOptions } from "./types";
import { getCSSVariableValue, hexToRgb } from "./utils";

export const plugin: Plugin<ChartType, OnyxChartOptions> = {
  id: "onyx",
  defaults: {
    color: "primary",
  },
  beforeLayout: (chart, args, options) => {
    const primaryColor = getCSSVariableValue(`--onyx-color-base-${options.color}-500`);
    const backgroundColor = hexToRgb(primaryColor);

    chart.config.data.datasets.forEach((dataset) => {
      dataset.borderColor = primaryColor;
      dataset.backgroundColor = `rgba(${backgroundColor}, 0.15)`;
      dataset.hoverBackgroundColor = `rgba(${backgroundColor}, 0.4)`;

      if ("type" in chart.config) {
        switch (chart.config.type) {
          case "line":
            styleLineDataset(dataset as ChartDataset<"line">, primaryColor);
        }
      }
    });

    if (!chart.config.options) chart.config.options = {};

    Object.values(chart.config.options.scales ?? {}).forEach((scale) => {
      if (!scale) return;
      styleScale(scale);
    });

    if (chart.config.options.plugins?.title) {
      chart.config.options.plugins.title.color = getCSSVariableValue(
        "--onyx-color-text-icons-neutral-intense",
      );
    }
  },
  beforeDraw: (chart) => {
    chart.legend?.legendItems?.forEach((item) => {
      item.fontColor = getCSSVariableValue("--onyx-color-text-icons-neutral-intense");
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
    color: getCSSVariableValue("--onyx-color-base-neutral-200"),
  };
  scale.ticks = {
    ...scale.ticks,
    color: getCSSVariableValue("--onyx-color-text-icons-neutral-soft"),
    font: {
      family: fontFamily,
      size: 13,
    },
  };

  scale.title = {
    ...scale.title,
    color: getCSSVariableValue("--onyx-color-text-icons-neutral-intense"),
    font: {
      family: fontFamily,
      size: 16,
    },
  };
};

const styleLineDataset = (data: ChartDataset<"line">, primaryColor: string) => {
  data.pointBorderColor = primaryColor;
  data.pointBackgroundColor = getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
  data.pointHoverBackgroundColor = primaryColor;
};
