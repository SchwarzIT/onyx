---
title: Chart.js plugin
---

# Chart.js plugin

---

## outline: [2, 3]

# @sit-onyx/chartjs-plugin

::div{.hide-external-link}
[![npm version](https://badge.fury.io/js/@sit-onyx%2Fchartjs-plugin.svg)](https://www.npmjs.com/package/@sit-onyx/chartjs-plugin)
::

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

```sh [pnpm]
pnpm add @sit-onyx/chartjs-plugin chart.js
```

```sh [npm]
npm install @sit-onyx/chartjs-plugin chart.js
```

```sh [yarn]
yarn install @sit-onyx/chartjs-plugin chart.js
```

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

```sh [pnpm]
pnpm add vue-chartjs
```

```sh [npm]
npm install vue-chartjs
```

```sh [yarn]
yarn install chart.js
```

### Bar

::client-only
:bar-chart
::

### Bubble

::client-only
:bubble-chart
::

### Doughnut

::client-only
:doughnut-chart
::

### Line

::client-only
:line-chart
::

### Pie

::client-only
:pie-chart
::

### Polar area

::client-only
:polar-area-chart
::

### Radar

::client-only
:radar-chart
::

### Scatter

::client-only
:scatter-chart
::

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
