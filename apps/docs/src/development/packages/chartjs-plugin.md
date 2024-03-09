---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/chartjs-plugin/package.json";
import LineChart from "../../.vitepress/components/LineChart.vue"
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
- Option to set the chart color to one of the [onyx color palette colors](/tokens/colors) (globally or individual per chart)

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
import { Chart } from "chart.js";
import { plugin } from "@sit-onyx/chartjs-plugin";
import "sit-onyx/style.css";

Chart.register(plugin);
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

### Line chart

<ClientOnly>
  <LineChart />
</ClientOnly>

::: details View the code
<<< @/.vitepress/components/LineChart.vue
:::
