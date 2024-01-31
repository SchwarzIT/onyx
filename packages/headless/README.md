<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/SchwarzIT/onyx/main/.github/onyx-logo-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/SchwarzIT/onyx/main/.github/onyx-logo-dark.svg">
    <img alt="onyx logo" src="https://raw.githubusercontent.com/SchwarzIT/onyx/main/.github/onyx-logo-dark.svg" width="160px">
  </picture>
</div>

<br>

# onyx Headless

A composable headless library for Vue created by [Schwarz IT](https://it.schwarz).

Inspired by [Melt UI](https://melt-ui.com/).

> **Work in progress**: This library is currently in early / active development.

<br />

## Getting Started

Install the npm package with your corresponding package manager:

### pnpm

```sh
pnpm add @sit-onyx/headless
```

### npm

```sh
npm install @sit-onyx/headless
```

### yarn

```sh
yarn install @sit-onyx/headless
```

Composables are now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { createCombobox } from "@sit-onyx/headless";

const {
  elements: {
    ...
  }
 } = createCombobox();
</script>
```

<br />

## [Contributing](../../CONTRIBUTING.md)
