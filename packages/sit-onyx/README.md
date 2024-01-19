<p>
  <a href="https://gruppe.schwarz">
  <div align="center">
    <img src="../../.github/schwarz-group.svg" width="400px" />
    </div>
  </a>
</p>

# onyx

A design system and Vue.js component library created by [Schwarz IT](https://it.schwarz).

> **Work in progress**: This library is currently in early / active development.

<br />

## Getting Started

Install the npm package with your corresponding package manager:

### pnpm

```sh
pnpm add sit-onyx
```

### npm

```sh
npm install sit-onyx
```

### yarn

```sh
yarn install sit-onyx
```

After that, import the global CSS file in your `main.ts` file:

```ts
import "sit-onyx/style.css";
// if you override some onyx styles (e.g. CSS variables),
// make sure to import your custom CSS file after the default "sit-onyx/style.css"
```

Components are now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";
</script>

<template>
  <OnyxButton label="Click me" />
</template>
```

<br />

## [Contributing](../../CONTRIBUTING.md)
