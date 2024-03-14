---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/chartjs-plugin/package.json";
import PolarAreaExample from "../../.vitepress/components/PolarAreaExample.vue"
</script>

# @sit-onyx/chartjs-plugin

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fchartjs-plugin.svg)](https://www.npmjs.com/package/@sit-onyx/chartjs-plugin)

</div>

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/chartjs-plugin).

## Features

The following features are included in this plugin:

- Set default colors/styles for charts, labels, borders etc.
- Update chart when switched between light/dark mode
- Default dataset colors based on the [onyx color palette colors](/tokens/colors)
- Utility to set the dataset color to one of the [onyx color palette colors](/tokens/colors)

## Installation

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/chartjs-plugin@alpha chart.js
```

```sh [npm]
npm install @sit-onyx/chartjs-plugin@alpha chart.js
```

```sh [yarn]
yarn install @sit-onyx/chartjs-plugin@alpha chart.js
```

:::

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

## Examples

The following examples assume you have also installed `vue-chartjs`.

::: code-group

```sh [pnpm]
pnpm add vue-chartjs
```

```sh [npm]
npm install vue-chartjs
```

```sh [yarn]
yarn install chart.js
```

:::

### Polar area chart

<ClientOnly>
  <PolarAreaExample />
</ClientOnly>

::: details View the code
<<< @/.vitepress/components/PolarAreaExample.vue
:::

### Custom dataset colors

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
