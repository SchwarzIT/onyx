---
title: Chart
---

Charts visualize quantitative data through graphical representations such as bars, lines, or slices — allowing users to identify patterns, trends, and key metrics at a glance.

## Installation

We use the Open Source [Chart.js](https://www.chartjs.org/) library for displaying charts. Follow the steps below to get started:

<steps>

::step
#headline
Install dependencies

#default
Install the npm packages into your project:

:npm-install-code-tabs{packages="chart.js vue-chartjs @sit-onyx/chartjs-plugin"}
::

</steps>

## Examples

Our following examples are only a few common examples for how to use Chart.js. For a full list of examples and features, check out:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="All Chart.js examples" link="https://www.chartjs.org/docs/latest/samples/information.html"></link-card>
</div>

### Line

Connects sequential data points with continuous lines to illustrate trends, rates of change, or continuous progression over time, such as tracking daily active users or stock prices.

<<< ./examples/Line.example.vue preview=true layout=fullWidth clientOnly=true

### Bar

Compares distinct categories using rectangular bars whose lengths represent values, making it ideal for evaluating discrete groups or tracking metrics like monthly revenue across products.

<<< ./examples/Bar.example.vue preview=true layout=fullWidth clientOnly=true

### Doughnut

Displays proportional part-to-whole breakdowns as slices of a hollow ring, ideal for showing percentage distributions across 3–6 categories while leaving the center open for summary metrics.

<<< ./examples/Doughnut.example.vue preview=true layout=fullWidth clientOnly=true

### Pie

Displays proportional data as slices of a solid circle that sum to 100%, best suited for showing simple composition or relative share among a few mutually exclusive categories.

<<< ./examples/Pie.example.vue preview=true layout=fullWidth clientOnly=true

### Bubble

Displays three-dimensional data on a 2D grid using X and Y coordinates for position and bubble size for a third metric, best for analyzing relationships across three variables simultaneously (e.g., ad spend vs. sales volume vs. market share).

<<< ./examples/Bubble.example.vue preview=true layout=fullWidth clientOnly=true

### Polar area

Divides a circle into equal-angled slices where each value is shown by its distance from the center, making it easier to compare relative magnitudes than traditional pie arc angles.

<<< ./examples/PolarArea.example.vue preview=true layout=fullWidth clientOnly=true

### Radar

Plots multivariate data along separate axes originating from a central point, creating a web-like shape that excels at comparing profiles or scores across multiple shared attributes (e.g., skill ratings or product dimensions).

<<< ./examples/Radar.example.vue preview=true layout=fullWidth clientOnly=true

### Scatter

Plots individual data points using numeric X and Y coordinates to reveal correlations, clusters, or outliers between two continuous variables like price and demand.

<<< ./examples/Scatter.example.vue preview=true layout=fullWidth clientOnly=true

### Colors

By default, the dataset colors will automatically rotate through our [quantitative color palette](/docs/foundation/colors#quantitative-colors). If you want to set a specific color for a dataset or apply a brand/system color, use the `getDatasetColors()` utility.

<<< ./examples/Colors.example.vue preview=true layout=fullWidth clientOnly=true

## Usage with Nuxt / SSR

::content-tabs
#nuxt
When using [Nuxt](https://nuxt.com) / SSR (Server Side Rendering), make sure to wrap the chart component inside [\<ClientOnly\>](https://nuxt.com/docs/4.x/api/components/client-only) since the Chart rendering relies on browser APIs and does not work on the server.

```vue [Bar.vue]
<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Bar } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"bar"> = {
    // your chart setup...
};

const options: ChartOptions<"bar"> = {
  // your chart setup...
};
</script>

<template>
  <div class="chart">
    <ClientOnly>
        <Bar :data :options />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 24rem;
}
</style>
```

::


