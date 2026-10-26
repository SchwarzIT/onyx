---
title: Chart
---

Charts visualize quantitative datasets through graphical representations such as bars, lines, or slices, allowing users to identify patterns and trends at a glance.

## Installation

Onyx integrates with the [Chart.js](https://www.chartjs.org/) library. To configure chart support in your project:

<steps>

::step
#headline
Install dependencies

#default
Install the required packages:

:npm-install-code-tabs{packages="chart.js vue-chartjs @sit-onyx/chartjs-plugin"}
::

</steps>

## Examples

The following examples are only a few common examples for how to use Chart.js. For the full sample gallery, see:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="All Chart.js examples" link="https://www.chartjs.org/docs/latest/samples/information.html"></link-card>
</div>

### Line

Connects sequential data points with continuous lines to illustrate trends over time (e.g. daily active users).

<<< ./examples/Line.example.vue preview=true layout=fullWidth clientOnly=true

### Bar

Compares discrete categories using horizontal or vertical bars, ideal for comparing metrics across distinct groups.

<<< ./examples/Bar.example.vue preview=true layout=fullWidth clientOnly=true

### Doughnut

Displays proportional breakdowns as slices of a ring, suitable for displaying percentage distributions with summary metrics in the center.

<<< ./examples/Doughnut.example.vue preview=true layout=fullWidth clientOnly=true

### Pie

Displays proportional data as slices summing to 100%, best for simple composition across mutually exclusive categories.

<<< ./examples/Pie.example.vue preview=true layout=fullWidth clientOnly=true

### Bubble

Plots three-dimensional data on a 2D coordinate system, using bubble radius as the third metric dimension.

<<< ./examples/Bubble.example.vue preview=true layout=fullWidth clientOnly=true

### Polar area

Divides a circle into equal sectors where each value corresponds to radius distance from center, simplifying magnitude comparisons.

<<< ./examples/PolarArea.example.vue preview=true layout=fullWidth clientOnly=true

### Radar

Plots multivariate data along axes originating from a central point, suited for comparing performance across shared dimensions.

<<< ./examples/Radar.example.vue preview=true layout=fullWidth clientOnly=true

### Scatter

Plots individual data points using numeric Cartesian coordinates to expose correlations, clusters, or outliers.

<<< ./examples/Scatter.example.vue preview=true layout=fullWidth clientOnly=true

### Colors

Datasets cycle through our [quantitative color palette](/docs/foundation/colors#quantitative-colors) by default. Use `getDatasetColors()` to assign explicit palette tokens or semantic system colors.

<<< ./examples/Colors.example.vue preview=true layout=fullWidth clientOnly=true

## Usage with Nuxt / SSR

::content-tabs
#nuxt
When using [Nuxt](https://nuxt.com) or SSR, wrap chart components in [`<ClientOnly>`](https://nuxt.com/docs/4.x/api/components/client-only) because canvas rendering depends on browser DOM APIs.

```vue [Bar.vue]
<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { type ChartData, registerables, Chart, type ChartOptions } from "chart.js";
import { Bar } from "vue-chartjs";

// register Chart.js and onyx plugin
Chart.register(...registerables);
registerOnyxPlugin(Chart);

const data: ChartData<"bar"> = {
    // chart dataset config...
};

const options: ChartOptions<"bar"> = {
  // chart options...
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


