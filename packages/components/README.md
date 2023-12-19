<p>
  <a href="https://gruppe.schwarz">
  <div align="center">
    <img src="../../.github/schwarz-group.svg" width="400px" />
    </div>
  </a>
</p>

# Onyx

A Vue.js UI component library and Design System created by [Schwarz IT](https://it.schwarz).

> **Work in progress**: This library is currently in early / active development.

<br />

## Getting Started

Install the npm package with your corresponding package manager:

### pnpm

```sh
pnpm add @sit-onyx/components
```

### npm

```sh
npm install @sit-onyx/components
```

### yarn

```sh
yarn install @sit-onyx/components
```

After that, import the global CSS file in your `main.ts` file:

```ts
import "@sit-onyx/components/style.css";
// if you override some Onyx styles (e.g. CSS variables),
// make sure to import your custom CSS file after the default "@sit-onyx/components/style.css"
```

Components are now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { OnyxButton } from "@sit-onyx/components";
</script>

<template>
  <OnyxButton label="Click me" />
</template>
```

<br />

## [Contributing](../../CONTRIBUTING.md)
