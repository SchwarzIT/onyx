---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/github-metrics/package.json";
</script>

# @sit-onyx/github-metrics

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fgithub-metrics.svg)](https://www.npmjs.com/package/@sit-onyx/github-metrics)

</div>

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/github-metrics).

## Installation

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/github-metrics
```

```sh [npm]
npm install @sit-onyx/github-metrics
```

```sh [yarn]
yarn install @sit-onyx/github-metrics
```

:::

## Metrics

Below you can find a list of available metrics that you can easily collect using this package.

## Authentication

The GitHub GraphQL API for accessing projects requires authentication using an personal access token.
So before you can use any of the below functions to collect metrics, you need to follow the steps below.

**Step 1: Get GitHub token**

Go to [https://github.com/settings/tokens](https://github.com/settings/tokens) and create a new personal access token.
In the permissions section, select "**read:project**"

**Step 2: Add token to your environment**

Add the token as `GITHUB_TOKEN` environment variable, e.g. via your terminal or by using the [dotenv](https://www.npmjs.com/package/dotenv) npm package and creating a .env file.

### Mean story size

Calculates the mean / average story size of an item in a given GitHub project.

```ts{4-6}
import { getMeanStorySize } from "@sit-onyx/github-metrics";

const meanStorySize = await getMeanStorySize({
  organization: "SchwarzIT",
  projectId: 5,
  field: "Effort (d)",
});
```
