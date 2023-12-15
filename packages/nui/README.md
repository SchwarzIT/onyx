<p>
  <a href="https://gruppe.schwarz">
  <div align="center">
    <img src="../../.github/schwarz-group.svg" width="400px" />
    </div>
  </a>
</p>

# NUI

A Vue.js UI component library and Design System created by [Schwarz IT](https://it.schwarz).

> **Work in progress**: This library is currently in early / active development. <br /> **Working title**: The name `NUI` is only a working title and will be changed in the future.

<br />

## Getting Started

Install the npm package with your corresponding package manager:

### pnpm

```sh
pnpm add nui
```

### npm

```sh
npm install nui
```

### yarn

```sh
yarn install nui
```

After that, import the global CSS file in your `main.ts` file:

```ts
import "nui/style.css";
// if you override some NUI styles (e.g. CSS variables),
// make sure to import your custom CSS file after the default "nui/style.css"
```

Components are now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { NuiButton } from "nui";
</script>

<template>
  <NuiButton label="Click me" />
</template>
```

<br />

## [Contributing](../../CONTRIBUTING.md)
