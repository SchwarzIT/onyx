# Chart.js plugin

---

# @sit-onyx/chartjs-plugin

:npm-package-badge{package="@sit-onyx/chartjs-plugin"}

{{ packageJson.description }}.

Please visit the [Chart.js documentation](https://www.chartjs.org) for further information how to implement charts.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/chartjs-plugin).

## Features

The following features are included in this plugin:

- Set default colors/styles for charts, labels, borders etc.
- Update chart when switched between light/dark mode
- Default dataset colors based on the [onyx color palette colors](/variables/colors)
- Utility to set the dataset color to one of the [onyx color palette colors](/variables/colors)

## Installation

Install the npm package with your corresponding package manager:

:npm-install-code-tabs{packages="@sit-onyx/chartjs-plugin chart.js"}

## Usage

```ts
import { Chart, registerables } from "chart.js";
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import "sit-onyx/style.css";

// register default Chart.js plugins
Chart.register(...registerables);

// register custom onyx plugin
registerOnyxPlugin(Chart);
```

## Example charts

The source code for the chart examples below can be found on [GitHub](https://github.com/SchwarzIT/onyx/tree/main/packages/chartjs-plugin/src/stories).

The following examples assume you have also installed `vue-chartjs`.

:npm-install-code-tabs{packages="vue-chartjs"}

### Bar

### Bubble

### Doughnut

### Line

### Pie

### Polar area

### Radar

### Scatter

## Custom dataset colors

By default, the dataset colors will be automatically set in order based on the [onyx quantitative colors](/basics/colors#quantitatives). If you want to set a specific color for a dataset, you can use the `getDatasetColors` utility.

For example to use the primary color for a line chart:

```ts
const chartData: ChartData<"line"> = {
  labels: ["A", "B", "C"],
  datasets: [
    {
      label: "Dataset A",
      data: [1, 2, 3],
      ...getDatasetColors("primary"),
    },
  ],
};
```
