---
title: Github Metrics
---

# Github Metrics

---

## outline: [2, 3]

# @sit-onyx/github-metrics

::div{.hide-external-link}
[![npm version](https://badge.fury.io/js/@sit-onyx%2Fgithub-metrics.svg)](https://www.npmjs.com/package/@sit-onyx/github-metrics)
::

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/github-metrics).

## Installation

Install the npm package with your corresponding package manager:

\::: code-group

```sh [pnpm]
pnpm add @sit-onyx/github-metrics
```

```sh [npm]
npm install @sit-onyx/github-metrics
```

```sh [yarn]
yarn install @sit-onyx/github-metrics
```

\:::

## Create a client

Since your GitHub project might be set up differently than the ones of other users, this package is designed to be flexible so it is able to work for any project setup.

Before you can start calculation metrics for your project, you need to create and configure a client so it understands the setup of your GitHub project.
Below is an example configuration, adjust it to fit your specific project.

```ts
import { createClient } from "@sit-onyx/github-metrics";

const client = createClient({
  organization: "SchwarzIT",
  projectId: 5,
  // see below for how to get a GitHub token
  authToken: "your-github-token",
  fields: {
    effort: "Effort (d)",
    iteration: "Sprint",
    status: {
      fieldName: "Status",
      options: {
        finished: "Done",
      },
    },
  },
});
```

### GitHub token

The GitHub GraphQL API for accessing projects requires authentication using an personal access token.

To get a new token, go to <https://github.com/settings/tokens> and create a new personal access token.
In the permissions section, select "**read\:project**"

Copy the generated token and pass it to the client via the `authToken` option when calling `createClient()` (see above). It is recommended to e.g. use an environment variable for this.

## Metrics

Below you can find a list of available metrics that you can easily collect using this package.

If you haven't already, [create a client](#create-a-client) first.

### Mean story size

Calculates the mean / average story size of an item in the given iteration.

```ts {4-6}
import { getMeanStorySize } from "@sit-onyx/github-metrics";

const data = await getMeanStorySize({
  client,
  // by default, the current iteration (today) will be used.
  // to get data for another iteration, simply pass any date that is in your desired iteration
  // iteration: new Date(2025, 9, 23),
});
```

### Bug fixing ratio

Calculates the bug fixing ratio in the given iteration (how much time is spend on bugs in relation to other stories).

```ts {4-6}
import { getBugFixingRatio } from "@sit-onyx/github-metrics";

const data = await getBugFixingRatio({
  client,
  // by default, the current iteration (today) will be used.
  // to get data for another iteration, simply pass any date that is in your desired iteration
  // iteration: new Date(2025, 9, 23),
});
```

### Throughput

Calculates the throughput in the given iteration (amount of items with status "finished").

```ts {4-6}
import { getThroughput } from "@sit-onyx/github-metrics";

const data = await getThroughput({
  client,
  // by default, the current iteration (today) will be used.
  // to get data for another iteration, simply pass any date that is in your desired iteration
  // iteration: new Date(2025, 9, 23),
});
```
