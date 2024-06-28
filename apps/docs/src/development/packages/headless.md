---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/headless/package.json";
</script>

# @sit-onyx/headless

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fheadless.svg)](https://www.npmjs.com/package/@sit-onyx/headless)

</div>

{{ packageJson.description }}.

Inspired by [Melt UI](https://melt-ui.com).

## Changelog

A full changelog can be found [here](/development/packages/changelogs/headless).

## Installation

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/headless@beta
```

```sh [npm]
npm install @sit-onyx/headless@beta
```

```sh [yarn]
yarn install @sit-onyx/headless@beta
```

:::

## Composables

### useComboBox

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
