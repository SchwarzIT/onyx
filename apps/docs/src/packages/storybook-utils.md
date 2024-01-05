---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../packages/storybook-utils/package.json";
</script>

# @sit-onyx/storybook-utils

{{ packageJson.description }}.

## Installation

<!--
Make sure that this chapter is kept up to date with installation steps in
packages/storybook-utils/README.md file.
 -->

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/storybook-utils storybook-dark-mode
```

```sh [npm]
npm install -D @sit-onyx/storybook-utils storybook-dark-mode
```

```sh [yarn]
yarn install -D @sit-onyx/storybook-utils storybook-dark-mode
```

:::

## Utilities

### createPreview

Creates a default Storybook preview configuration for a project that uses `Onyx`. Includes the following features:

- Improved controls (sorting and expanded controls so descriptions etc. are also shown in a single story)
- Improved Vue-specific code highlighting (e.g. using `@` instead of `v-on:`)
- Setup for dark mode (including docs page). Requires addon [`storybook-dark-mode`](https://storybook.js.org/addons/storybook-dark-mode) to be enabled in .storybook/main.ts file
- Support for setting the light/dark mode when Storybook is embedded as an iframe (via query parameter, e.g. `?theme=dark`).
- Configure viewports / breakpoints as defined by Onyx

::: code-group

```ts [.storybook/preview.ts]
import { createPreview } from "@sit-onyx/storybook-utils";

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

### defineStorybookActionsAndVModels

Utility to define Storybook meta for a given Vue component which will take care of defining argTypes for the given events as well as implementing v-model handlers so that the Storybook controls are updated when you interact with the component.

Supports auto-completion for event names. Should be preferred over manually defining argTypes for `*.stories.ts` files.

::: code-group

```ts [TestInput.stories.ts]
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import TestInput from "./TestInput.vue";

/**
 * The input component can be used to...
 */
const meta: Meta<typeof TestInput> = {
  title: "components/TestInput",
  ...defineStorybookActionsAndVModels({
    component: TestInput,
    events: ["update:modelValue", "change"],
  }),
};

export default meta;
type Story = StoryObj<typeof TestInput>;
```

:::
