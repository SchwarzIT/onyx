---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/nuxt-docs/package.json";
</script>

# @sit-onyx/nuxt-docs

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fnuxt-docs.svg)](https://www.npmjs.com/package/@sit-onyx/nuxt-docs)

</div>

{{ packageJson.description }}.

::: warning Work in progress
This package is work in progress. More features will be added in the future.
:::

## Changelog

A full changelog can be found [here](/development/packages/changelogs/nuxt-docs).

## Features

The theme includes the following features:

- pre-defined page layouts (landing page, docs etc.)
- pre-configured [Nuxt content](https://content.nuxt.com/) module to render markdown pages with onyx components.
- custom user friendly error page for 404, unexpected errors etc.

## Installation

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/nuxt-docs@beta
```

```sh [npm]
npm install -D @sit-onyx/nuxt-docs@beta
```

```sh [yarn]
yarn install -D @sit-onyx/nuxt-docs@beta
```

:::

## Usage

You can check the [Nuxt documentation](https://nuxt.com/docs/getting-started/layers#usage) for further information.

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ["@sit-onyx/nuxt-docs"],
});
```

:::
