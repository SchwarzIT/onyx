import type { ChartDataset, Plugin, ScaleOptions } from "chart.js";

export const plugin: Plugin = {
  id: "onyx",
  beforeLayout: (chart) => {
    chart.config.data.datasets.forEach((dataset) => {
      const primaryColor = getCSSVariableValue("--onyx-color-base-primary-500");
      const backgroundColor = hexToRgb(primaryColor);

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
    if (!chart.config.options.plugins) chart.config.options.plugins = {};

    Object.values(chart.config.options.scales ?? {}).forEach((scale) => {
      if (!scale) return;
      styleScale(scale);
    });
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
 * Gets the current value of the given CSS variable.
 * @param CSS variable name, e.g. `--onyx-color-base-primary-500`
 */
export const getCSSVariableValue = (variableName: string) => {
  return getComputedStyle(document.body).getPropertyValue(variableName);
};

const styleLineDataset = (data: ChartDataset<"line">, primaryColor: string) => {
  data.pointBorderColor = primaryColor;
  data.pointBackgroundColor = getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
  data.pointHoverBackgroundColor = primaryColor;
};

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

/**
 * Converts the given HEX color to rgb.
 */
const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};
