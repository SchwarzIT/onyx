import {
  DoughnutController,
  PieController,
  PolarAreaController,
  type Chart,
  type ChartDataset,
  type ChartType,
  type Color,
  type Plugin,
  type ScaleOptionsByType,
  type ScaleTypeRegistry,
} from "chart.js";
import { QUANTITATIVE_COLOR_STEPS, getCSSVariableValue, hexToRgb } from "./utils.js";

/**
 * Registers the onyx Chart.js plugin and updates the default styles (colors, fonts etc.) to match
 * the onyx design system. Will disable Chart.js default "color" plugin to avoid conflicts.
 *
 * Styles will be updated accordingly if the application is switched between light/dark mode.
 *
 * @example
 * ```ts
 * import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
 * import { Chart, registerables } from "chart.js";
 *
 * Chart.register(...registerables);
 * registerOnyxPlugin(Chart);
 * ```
 */
export const registerOnyxPlugin = (chart: typeof Chart) => {
  //
  // IMPLEMENTATION NOTES:
  // is you use "getCSSVariableValue" here, make sure its either a function
  // or a getter defined with "Object.defineProperty".
  // Otherwise if called directly, this is not compatible with server side rendering.
  //
  // Also if setting any plugin options here (e.g. tooltip), make sure to check that they
  // are defined/register to prevent "can not set/read of undefined" errors
  //
  chart.register(plugin);

  if (chart.defaults.plugins.colors) {
    chart.defaults.plugins.colors.enabled = false;
  }

  //
  // General default styles for all chart types
  //
  Object.defineProperty(chart.defaults.font, "family", {
    configurable: true,
    enumerable: true,
    get: () => getCSSVariableValue("--onyx-font-family"),
  });

  chart.defaults.font.size = 13;

  chart.defaults.borderColor = () => getCSSVariableValue("--onyx-color-base-neutral-300");
  chart.defaults.color = () => getCSSVariableValue("--onyx-color-text-icons-neutral-medium");

  if (chart.defaults.plugins.tooltip) {
    chart.defaults.plugins.tooltip.backgroundColor = () => {
      return getCSSVariableValue("--onyx-color-base-neutral-900");
    };
    chart.defaults.plugins.tooltip.titleColor = () => {
      return getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
    };
    chart.defaults.plugins.tooltip.bodyColor = () => {
      return getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
    };
  }

  if (chart.defaults.plugins.title) {
    chart.defaults.plugins.title.color = createColorGetter(
      "--onyx-color-text-icons-neutral-intense",
    );
    chart.defaults.plugins.title.font = {
      weight: "bold",
      size: 16,
    };
  }

  if (chart.defaults.scales.radialLinear) {
    chart.defaults.scales.radialLinear.ticks.backdropColor = () => {
      return getCSSVariableValue("--onyx-color-base-background-tinted");
    };
  }

  Object.entries(chart.defaults.scales).forEach(([key, scale]) => {
    // exclude radialLinear scale because it does not support a title
    if (key === "radialLinear") return;
    const typedScale = scale as ScaleOptionsByType<
      Exclude<keyof ScaleTypeRegistry, "radialLinear">
    >;

    typedScale.title = {
      ...typedScale.title,
      color: createColorGetter("--onyx-color-text-icons-neutral-soft"),
      font: {
        size: 16,
      },
    };
  });
};

const plugin: Plugin<ChartType, undefined> = {
  id: "onyx",
  /**
   * We use the "beforeUpdate" hook to apply styles to the individual datasets
   * of the chart.
   */
  beforeLayout: (chart) => {
    /** Color offset / index so every dataset gets a unique color. */
    let colorOffset = 0;

    chart.config.data.datasets.forEach((dataset, index) => {
      const controller = chart.getDatasetMeta(index).controller;

      if (controller instanceof DoughnutController || controller instanceof PolarAreaController) {
        colorizeDataset(dataset, colorOffset, true);
        colorOffset += dataset.data.length;
      } else if (controller) {
        colorizeDataset(dataset, colorOffset);
        colorOffset++;
      }
    });

    // due to some reason the doughnut and pie charts do not use the default font size
    // for the scale titles so we need to manually set them here
    const controller = chart.getDatasetMeta(0).controller;
    if (controller instanceof DoughnutController || controller instanceof PieController) {
      Object.values(chart.config.options?.scales ?? {}).forEach((scale) => {
        if (!scale) return;
        const typedScale = scale as ScaleOptionsByType<
          Exclude<keyof ScaleTypeRegistry, "radialLinear">
        >;

        typedScale.title.font = {
          ...typedScale.title.font,
          size: 16,
        };
      });
    }
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

    // TODO: see https://github.com/SchwarzIT/onyx/issues/618
    // change to media query once the above ticket is implemented
    // for example implementation see: https://css-tricks.com/working-with-javascript-media-queries/#aa-listen-for-changes
    darkModeObserver.observe(document.body, observerOptions);
    darkModeObserver.observe(document.documentElement, observerOptions);
  },
};

/**
 * Some Chart.js color properties are actually typed incorrect
 * because they support getters but are typed as static colors.
 * This function will create a color getter which is type casted as static "Color".
 */
const createColorGetter = (color: string) => {
  const getter = () => getCSSVariableValue(color);
  return getter as unknown as Color;
};

/**
 * Colorizes the given dataset with colors from the onyx design system.
 *
 * @param dataset Dataset to colorize
 * @param offset Offset for the colors. Useful if multiple datasets are used inside a chart which
 * should have different colors.
 * @param allData Set this to true for doughnut, pie and polar area chart type so every data has a separate color.
 */
const colorizeDataset = (dataset: ChartDataset, offset = 0, allData = false) => {
  const borderColorizer = () => {
    if (dataset.borderColor) return dataset.borderColor;
    if (allData) return dataset.data.map((_, index) => getBorderColor(offset + index));
    return getBorderColor(offset);
  };

  const backgroundColorizer = () => {
    if (dataset.backgroundColor) return dataset.backgroundColor;
    if (allData) return dataset.data.map((_, index) => getBackgroundColor(offset + index));
    return getBackgroundColor(offset);
  };

  dataset.borderColor = borderColorizer();
  dataset.backgroundColor = backgroundColorizer();
};

/**
 * Available colors to choose from for default dataset styles.
 */
const COLORS = QUANTITATIVE_COLOR_STEPS.map(
  (step) => `--onyx-color-base-quantitatives-${step}` as const,
);

/**
 * Gets a border color.
 */
const getBorderColor = (i: number) => getCSSVariableValue(COLORS[i % COLORS.length]);

/**
 * Gets a background color (same as border color + 30% transparency).
 */
const getBackgroundColor = (i: number) => {
  const color = getBorderColor(i);
  return `rgba(${hexToRgb(color)}, 0.3)`;
};
