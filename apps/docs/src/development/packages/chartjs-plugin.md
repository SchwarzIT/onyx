---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/chartjs-plugin/package.json";
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

## Installation

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/chartjs-plugin@alpha chart.js vue-chartjs
```

```sh [npm]
npm install @sit-onyx/chartjs-plugin@alpha chart.js vue-chartjs
```

```sh [yarn]
yarn install @sit-onyx/chartjs-plugin@alpha chart.js vue-chartjs
```

:::

## Usage

```ts
import { Chart, registerables } from "chart.js";
import { plugin } from "@sit-onyx/chartjs-plugin";
import "sit-onyx/style.css";

Chart.register(plugin);
```
