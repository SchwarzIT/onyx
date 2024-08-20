---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/storybook-utils/package.json";
</script>

# @sit-onyx/storybook-utils

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fstorybook-utils.svg)](https://www.npmjs.com/package/@sit-onyx/storybook-utils)

</div>

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/storybook-utils).

## Installation

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/storybook-utils@beta
```

```sh [npm]
npm install -D @sit-onyx/storybook-utils@beta
```

```sh [yarn]
yarn install -D @sit-onyx/storybook-utils@beta
```

:::

## Utilities

### createPreview

Creates a default Storybook preview configuration for a project that uses `onyx`. Includes the following features:

- Improved controls (sorting and expanded controls so descriptions etc. are also shown in a single story)
- Improved Vue-specific code highlighting (e.g. using `@` instead of `v-on:`)
- Setup for dark mode (including docs page). Requires addon [`storybook-dark-mode`](https://storybook.js.org/addons/storybook-dark-mode) to be enabled in .storybook/main.ts file
- Custom Storybook theme using onyx colors (light and dark mode)
- Configure viewports / breakpoints as defined by onyx
- Logs Vue emits as Storybook events

::: code-group

```ts [.storybook/preview.ts]
import { createPreview } from "@sit-onyx/storybook-utils";
import "@sit-onyx/storybook-utils/style.css";

const preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...createPreview({
    // optional overrides...
  }),
};

export default preview;
```

```ts [.storybook/main.ts]
import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  addons: ["storybook-dark-mode"],
  // ...
};

export default config;
```

:::

### withGlobalVModelDecorator

Defines a custom decorator that will implement event handlers for all v-models.
So the Storybook controls are updated live when the user interacts with the component.

```ts [.storybook/preview.ts]
import { withGlobalVModelDecorator } from "@sit-onyx/storybook-utils";

export default {
  decorators: [withGlobalVModelDecorator()],
};
```

### createTheme

Creates a custom theme for Storybook that uses onyx colors.
See the [Storybook Theming docs](https://storybook.js.org/docs/configure/theming) for further information.

::: tip
If you are using [`createPreview()`](#createpreview), the custom light and dark theme will already be set up for you.
:::

Make sure you have installed the `@storybook/manager-api` package:

::: code-group

```sh [pnpm]
pnpm add -D @storybook/manager-api
```

```sh [npm]
npm install -D @storybook/manager-api
```

```sh [yarn]
yarn install -D @storybook/manager-api
```

:::

::: code-group

```ts [.storybook/manager.ts]
import { createTheme } from "@sit-onyx/storybook-utils";
import { addons } from "@storybook/manager-api";

addons.setConfig({
  theme: createTheme({
    base: "light", // choose whether you want a light or dark theme
  }),
});
```

```ts [.storybook/preview.ts]
import { createTheme } from "@sit-onyx/storybook-utils";
import type { Preview } from "@storybook/vue3";

const preview: Preview = {
  parameters: {
    docs: {
      theme: createTheme({
        base: "light", // choose whether you want a light or dark theme
      }),
    },
  },
};

export default preview;
```

:::
