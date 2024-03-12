import type {
  Chart,
  ChartType,
  Color,
  LineControllerDatasetOptions,
  Plugin,
  ScaleOptionsByType,
  ScaleTypeRegistry,
} from "chart.js";
import type { DeepPartial, OnyxColor } from "sit-onyx/types";
import type { OnyxChartOptions } from "./types";
import { getCSSVariableValue, hexToRgb } from "./utils";

const defaultPluginOptions = {
  color: "primary",
} as const satisfies OnyxChartOptions;

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
export const registerOnyxPlugin = (
  chart: typeof Chart,
  overrideDefaults?: DeepPartial<OnyxChartOptions>,
) => {
  chart.register(plugin);
  chart.defaults.plugins.onyx = overrideDefaults ?? defaultPluginOptions;
  chart.defaults.plugins.colors.enabled = false;

  //
  // General default styles for all chart types
  //
  chart.defaults.font.family = getCSSVariableValue("--onyx-font-family");
  chart.defaults.font.size = 13;

  chart.defaults.borderColor = () => getCSSVariableValue("--onyx-color-base-neutral-300");
  chart.defaults.color = () => getCSSVariableValue("--onyx-color-text-icons-neutral-medium");

  chart.defaults.plugins.tooltip.backgroundColor = () => {
    return getCSSVariableValue("--onyx-color-base-neutral-900");
  };
  chart.defaults.plugins.tooltip.titleColor = () => {
    return getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
  };
  chart.defaults.plugins.tooltip.bodyColor = () => {
    return getCSSVariableValue("--onyx-color-text-icons-neutral-inverted");
  };

  chart.defaults.plugins.title.color = createColorGetter("--onyx-color-text-icons-neutral-intense");
  chart.defaults.plugins.title.font = {
    weight: "bold",
    size: 16,
  };

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

  const onyxColor = chart.defaults.plugins.onyx.color ?? defaultPluginOptions.color;

  //
  // Line chart
  //
  applyLineChartStyles(chart.defaults.datasets.line, onyxColor);
};

const plugin: Plugin<ChartType, OnyxChartOptions> = {
  id: "onyx",
  defaults: defaultPluginOptions,
  /**
   * We use the "beforeUpdate" hook to apply styles that can be overridden
   * per chart individually with plugin options.
   */
  beforeUpdate: (chart, args, options) => {
    if (chart.options.datasets?.line) {
      applyLineChartStyles(chart.options.datasets.line, options.color);
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

const applyLineChartStyles = (
  line: DeepPartial<
    Pick<
      LineControllerDatasetOptions,
      "borderColor" | "backgroundColor" | "pointBorderColor" | "pointBackgroundColor"
    >
  >,
  baseColor: OnyxColor,
) => {
  line.borderColor = () => {
    return getCSSVariableValue(`--onyx-color-base-${baseColor}-500`);
  };
  line.backgroundColor = () => {
    const color = getCSSVariableValue(`--onyx-color-base-${baseColor}-500`);
    return `rgba(${hexToRgb(color)}, 0.3)`;
  };
  line.pointBorderColor = () => {
    return getCSSVariableValue("--onyx-color-base-neutral-700");
  };
  line.pointBackgroundColor = () => {
    return getCSSVariableValue("--onyx-color-base-neutral-100");
  };
};
